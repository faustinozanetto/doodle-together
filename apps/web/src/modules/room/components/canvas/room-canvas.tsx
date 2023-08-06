'use client';

import React, { useCallback, useEffect } from 'react';
import {
  CanvasClearedSocketPayload,
  DispatchCanvasStateSocketPayload,
  GetCanvasStateSocketPayload,
  RequestCanvasStateSocketPayload,
  SendCanvasStateSocketPayload,
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

      socketState.socket?.emit('draw_point', { roomId: room.roomId, point: data });
    },
    [roomState.room]
  );

  const onCanvasCleared = useCallback(() => {
    const { room } = roomState;
    if (!room) return;

    const payload: CanvasClearedSocketPayload = {
      roomId: room.roomId,
    };

    socketState.socket?.emit('canvas_cleared', payload);
  }, [roomState.room]);

  const onCanvasResized = useCallback(
    (width, height) => {
      const { room } = roomState;
      const { me } = meState;
      if (!room || !me) return;

      const payload: RequestCanvasStateSocketPayload = {
        roomId: room.roomId,
        userId: me.userId,
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
    socketState.socket?.on('clear_canvas', () => {
      if (!context) return;

      clearCanvas();
    });

    // Update canvas state socket listening
    socketState.socket?.on('update_canvas_state', (data) => {
      if (!context) return;

      const { point } = data;
      drawPoint({ ...point, context });
    });

    // Get canvas state socket listening
    socketState.socket?.on('get_canvas_state', (data: GetCanvasStateSocketPayload) => {
      const { userId } = data;

      const { room } = roomState;
      const { me } = meState;

      if (!canvasElement || !room || !me) return;

      const canvasState = canvasElement.toDataURL();
      const payload: SendCanvasStateSocketPayload = {
        roomId: room.roomId,
        canvasState,
        userId,
      };

      socketState.socket?.emit('send_canvas_state', payload);
    });

    // Dispatch canvas state socket listening
    socketState.socket?.on('dispatch_canvas_state', (data: DispatchCanvasStateSocketPayload) => {
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
      socketState.socket?.off('update_canvas_state');
      socketState.socket?.off('get_canvas_state');
      socketState.socket?.off('clear_canvas');
      socketState.socket?.off('dispatch_canvas_state');
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
