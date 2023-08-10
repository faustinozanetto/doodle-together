'use client';

import React, { useCallback, useMemo } from 'react';
import {
  CanvasClearedSocketPayload,
  DrawEraserSocketPayload,
  DrawPointSocketPayload,
  RequestCanvasStateSocketPayload,
  SocketNames,
} from '@doodle-together/shared';
import { useRoomDraw } from '@modules/room/hooks/use-room-draw';

import { RoomDrawEraserPayload, RoomDrawPointPayload } from '@modules/room/types/room.types';
import { roomState } from '@modules/state/room.slice';
import { socketState } from '@modules/state/socket.slice';
import { meState } from '@modules/state/me.slice';
import { useClearRoomCanvasSocket } from '@modules/room/hooks/sockets/use-clear-room-canvas-socket';
import { useUpdateRoomCanvasStateSocket } from '@modules/room/hooks/sockets/use-update-room-canvas-state-socket';
import { useGetRoomCanvasStateSocket } from '@modules/room/hooks/sockets/use-get-room-canvas-state-socket';
import { useDispatchRoomCanvasStateSocket } from '@modules/room/hooks/sockets/use-dispatch-room-canvas-state-socket';
import { drawEraser } from '@modules/room/lib/room-draw.lib';
import { customizationState } from '@modules/state/customization.slice';
import { useSnapshot } from 'valtio';

const RoomCanvas: React.FC = () => {
  const customizationStateSnapshot = useSnapshot(customizationState);

  const onPointDraw = useCallback(
    (drawPointPayload: RoomDrawPointPayload) => {
      const { room } = roomState;

      if (!room) return;

      const payload: DrawPointSocketPayload = {
        data: {
          color: drawPointPayload.color,
          point: drawPointPayload.point,
          prevPoint: drawPointPayload.prevPoint,
          size: drawPointPayload.size,
        },
        roomId: room.id,
      };

      socketState.socket?.emit(SocketNames.DRAW_POINT, payload);
    },
    [roomState.room]
  );

  const onEraserDraw = useCallback(
    (drawEraserPayload: RoomDrawEraserPayload) => {
      const { room } = roomState;

      if (!room) return;

      const payload: DrawEraserSocketPayload = {
        data: {
          point: drawEraserPayload.point,
          prevPoint: drawEraserPayload.prevPoint,
        },
        roomId: room.id,
      };

      socketState.socket?.emit(SocketNames.DRAW_ERASER, payload);
    },
    [roomState.room]
  );

  const onCanvasCleared = useCallback(() => {
    const { room } = roomState;
    if (!room) return;

    const payload: CanvasClearedSocketPayload = {
      roomId: room.id,
    };

    socketState.socket?.emit(SocketNames.CANVAS_CLEARED, payload);
  }, [roomState.room]);

  const onCanvasResized = useCallback(() => {
    const { room } = roomState;
    const { me } = meState;
    if (!room || !me) return;

    const payload: RequestCanvasStateSocketPayload = {
      roomId: room.id,
      userId: me.id,
    };

    socketState.socket?.emit(SocketNames.REQUEST_CANVAS_STATE, payload);
  }, [roomState, meState]);

  const { wrapperRef, canvasRef, handleOnMouseDown, drawPoint, clearCanvas } = useRoomDraw({
    onPointDraw,
    onCanvasCleared,
    onCanvasResized,
    onEraserDraw,
  });

  /** Room Canvas Socket Hooks */
  useClearRoomCanvasSocket({ canvasRef, onCanvasCleared: clearCanvas });
  useUpdateRoomCanvasStateSocket({
    canvasRef,
    onCanvasUpdated: (data, context) => {
      if (data.tool === 'pencil') drawPoint({ ...data.data, context });
      else if (data.tool === 'eraser') drawEraser({ ...data.data, context });
    },
  });
  useGetRoomCanvasStateSocket({ canvasRef });
  useDispatchRoomCanvasStateSocket({ canvasRef });

  const generateCanvasStyles = useMemo(() => {
    const { background } = customizationStateSnapshot;
    const { enableGrid, gridSize } = background;

    const styles: React.CSSProperties = {
      backgroundImage: enableGrid
        ? 'linear-gradient(to right, hsl(var(--border)), 1px, transparent 1px), linear-gradient(hsl(var(--border)), 1px, transparent 1px)'
        : '',
      backgroundSize: `${gridSize}px ${gridSize}px`,
    };

    return styles;
  }, [customizationStateSnapshot]);

  return (
    <div ref={wrapperRef} className="h-full w-full">
      <canvas
        id="room-canvas"
        ref={canvasRef}
        className="cursor-pointer"
        onMouseDown={handleOnMouseDown}
        width={0}
        height={0}
        style={generateCanvasStyles}
      />
    </div>
  );
};

export default RoomCanvas;
