'use client';

import React, { ElementRef, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  CanvasClearedSocketPayload,
  DrawEraserSocketPayload,
  DrawPointSocketPayload,
  RequestCanvasStateSocketPayload,
  SocketNames,
} from '@doodle-together/shared';
import { useRoomDraw } from '@modules/room/hooks/use-room-draw';

import { RoomDrawEraserPayload, RoomDrawPointPayload } from '@modules/room/types/room.types';
import { useRoomStore } from '@modules/state/room.slice';

import { useClearRoomCanvasSocket } from '@modules/room/hooks/sockets/use-clear-room-canvas-socket';
import { useUpdateRoomCanvasStateSocket } from '@modules/room/hooks/sockets/use-update-room-canvas-state-socket';
import { useGetRoomCanvasStateSocket } from '@modules/room/hooks/sockets/use-get-room-canvas-state-socket';
import { useDispatchRoomCanvasStateSocket } from '@modules/room/hooks/sockets/use-dispatch-room-canvas-state-socket';

import { useMeStore } from '@modules/state/me.slice';
import socket from '@modules/socket/lib/socket.lib';
import { useCustomizationStore } from '@modules/state/customization.slice';

const RoomCanvas: React.FC = () => {
  const localCanvasRef = useRef<ElementRef<'canvas'>>(null);

  const { room, setCanvasRef } = useRoomStore();
  const { background } = useCustomizationStore();

  const { me } = useMeStore();

  const onPointDraw = useCallback(
    (drawPointPayload: RoomDrawPointPayload) => {
      const payload: DrawPointSocketPayload = {
        data: {
          color: drawPointPayload.color,
          point: drawPointPayload.point,
          prevPoint: drawPointPayload.prevPoint,
          size: drawPointPayload.size,
        },
        roomId: room?.id!,
      };

      socket.emit(SocketNames.DRAW_POINT, payload);
    },
    [room]
  );

  const onEraserDraw = (drawEraserPayload: RoomDrawEraserPayload) => {
    if (!room) return;

    const payload: DrawEraserSocketPayload = {
      data: {
        point: drawEraserPayload.point,
        prevPoint: drawEraserPayload.prevPoint,
      },
      roomId: room.id,
    };

    socket.emit(SocketNames.DRAW_ERASER, payload);
  };

  const onCanvasCleared = () => {
    if (!room) return;

    const payload: CanvasClearedSocketPayload = {
      roomId: room.id,
    };

    socket.emit(SocketNames.CANVAS_CLEARED, payload);
  };

  const onCanvasResized = () => {
    if (!room || !me) return;

    const payload: RequestCanvasStateSocketPayload = {
      roomId: room.id,
      userId: me.id,
    };

    socket.emit(SocketNames.REQUEST_CANVAS_STATE, payload);
  };

  const { wrapperRef, handleOnMouseDown, clearCanvas } = useRoomDraw({
    onPointDraw,
    onCanvasCleared,
    onCanvasResized,
    onEraserDraw,
  });

  /** Room Canvas Socket Hooks */
  useClearRoomCanvasSocket({ onRequestCanvasClear: clearCanvas });
  useUpdateRoomCanvasStateSocket();
  useGetRoomCanvasStateSocket();
  useDispatchRoomCanvasStateSocket();

  useEffect(() => {
    if (localCanvasRef.current) {
      setCanvasRef(localCanvasRef);
    }
  }, [setCanvasRef]);

  const generateCanvasStyles = useMemo(() => {
    const { enableGrid, gridSize } = background;

    const styles: React.CSSProperties = {
      backgroundImage: enableGrid
        ? 'linear-gradient(to right, hsl(var(--border)), 1px, transparent 1px), linear-gradient(hsl(var(--border)), 1px, transparent 1px)'
        : '',
      backgroundSize: `${gridSize}px ${gridSize}px`,
    };

    return styles;
  }, [background]);

  return (
    <div ref={wrapperRef} className="h-full w-full">
      <canvas
        id="room-canvas"
        ref={localCanvasRef}
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
