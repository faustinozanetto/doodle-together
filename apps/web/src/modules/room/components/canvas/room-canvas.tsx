'use client';

import React, { useCallback, useEffect } from 'react';
import {
  CanvasClearedSocketPayload,
  DispatchCanvasStateSocketPayload,
  GetCanvasStateSocketPayload,
  RequestCanvasStateSocketPayload,
  SendCanvasStateSocketPayload,
  SocketNames,
} from '@doodle-together/shared';
import { useRoomDraw } from '@modules/room/hooks/use-room-draw';

import { RoomDrawPointPayload } from '@modules/room/types/room.types';
import { roomState } from '@modules/state/room.slice';
import { socketState } from '@modules/state/socket.slice';
import { meState } from '@modules/state/me.slice';

const RoomCanvas: React.FC = () => {
  const onPointDraw = useCallback(
    (data: RoomDrawPointPayload) => {
      const { room } = roomState;
      if (!room) return;

      socketState.socket?.emit('draw_point', { roomId: room.id, point: data });
    },
    [roomState.room]
  );

  const onCanvasCleared = useCallback(() => {
    const { room } = roomState;
    if (!room) return;

    const payload: CanvasClearedSocketPayload = {
      roomId: room.id,
    };

    socketState.socket?.emit('canvas_cleared', payload);
  }, [roomState.room]);

  const onCanvasResized = useCallback(
    (width, height) => {
      const { room } = roomState;
      const { me } = meState;
      if (!room || !me) return;

      const payload: RequestCanvasStateSocketPayload = {
        roomId: room.id,
        userId: me.id,
      };

      socketState.socket?.emit('request_canvas_state', payload);
      console.log(`Canvas Resized: (${width}px, ${height}px)`);
    },
    [roomState, meState]
  );

  const { wrapperRef, canvasRef, handleOnMouseDown, drawPoint, clearCanvas } = useRoomDraw({
    onPointDraw,
    onCanvasCleared,
    onCanvasResized,
  });

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const context = canvasElement?.getContext('2d');

    // Clear canvas socket listening
    socketState.socket?.on(SocketNames.CLEAR_CANVAS, () => {
      if (!context) return;

      clearCanvas();
    });

    // Update canvas state socket listening
    socketState.socket?.on(SocketNames.UPDATE_CANVAS_STATE, (data) => {
      if (!context) return;

      const { point } = data;
      drawPoint({ ...point, context });
    });

    // Get canvas state socket listening
    socketState.socket?.on(SocketNames.GET_CANVAS_STATE, (data: GetCanvasStateSocketPayload) => {
      const { userId } = data;

      const { room } = roomState;
      const { me } = meState;

      if (!canvasElement || !room || !me) return;

      const canvasState = canvasElement.toDataURL();
      const payload: SendCanvasStateSocketPayload = {
        canvasState,
        userId,
      };

      socketState.socket?.emit(SocketNames.SEND_CANVAS_STATE, payload);
    });

    // Dispatch canvas state socket listening
    socketState.socket?.on(SocketNames.DISPATCH_CANVAS_STATE, (data: DispatchCanvasStateSocketPayload) => {
      const { canvasState } = data;

      console.log(`Dispatch canvas state received: ${canvasElement}, ${context}`);

      if (!canvasElement || !context) return;

      const img = new Image();
      img.src = canvasState;
      img.onload = () => {
        context.clearRect(0, 0, canvasElement.width, canvasElement.height);
        context.drawImage(img, 0, 0);
      };
    });

    return () => {
      socketState.socket?.off(SocketNames.UPDATE_CANVAS_STATE);
      socketState.socket?.off(SocketNames.GET_CANVAS_STATE);
      socketState.socket?.off(SocketNames.CLEAR_CANVAS);
      socketState.socket?.off(SocketNames.DISPATCH_CANVAS_STATE);
    };
  }, [canvasRef, roomState.room]);

  return (
    <div ref={wrapperRef} className="h-full w-full">
      <canvas
        id="canvas"
        ref={canvasRef}
        className="cursor-pointer"
        onMouseDown={handleOnMouseDown}
        width={0}
        height={0}
        style={{
          backgroundImage:
            'linear-gradient(to right, hsl(var(--border)), 1px, transparent 1px), linear-gradient(hsl(var(--border)), 1px, transparent 1px)',
          backgroundSize: '10px 10px',
        }}
      />
    </div>
  );
};

export default RoomCanvas;
