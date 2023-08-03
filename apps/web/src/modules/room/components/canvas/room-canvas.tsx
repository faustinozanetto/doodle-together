'use client';

import React, { useCallback, useEffect } from 'react';
import { useRoomDraw } from '@modules/room/hooks/use-room-draw';

import { RoomDrawPointPayload } from '@modules/room/types/room.types';
import {
  CanvasClearedSocketPayload,
  DispatchCanvasStateSocketPayload,
  GetCanvasStateSocketPayload,
  SendCanvasStateSocketPayload,
} from '@doodle-together/types';
import { useMeStore } from '@modules/state/me.slice';
import { useRoomStore } from '@modules/state/room.slice';
import { useSocketStore } from '@modules/state/socket.slice';

const RoomCanvas: React.FC = () => {
  const { me } = useMeStore();
  const { room } = useRoomStore();
  const { socket } = useSocketStore();

  const onPointDraw = useCallback(
    (data: RoomDrawPointPayload) => {
      if (!room) return;

      socket?.emit('draw_point', { roomId: room.roomId, point: data });
    },
    [room?.roomId]
  );

  const onCanvasCleared = useCallback(() => {
    if (!room) return;

    const payload: CanvasClearedSocketPayload = {
      roomId: room.roomId,
    };

    socket?.emit('canvas_cleared', payload);
  }, [room?.roomId]);

  const { wrapperRef, canvasRef, handleOnMouseDown, drawPoint, clearCanvas } = useRoomDraw({
    onPointDraw,
    onCanvasCleared,
  });

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const context = canvasElement?.getContext('2d');

    // Clear canvas socket listening
    socket?.on('clear_canvas', () => {
      if (!context) return;

      clearCanvas();
    });

    // Update canvas state socket listening
    socket?.on('update_canvas_state', (data) => {
      if (!context) return;

      const { point } = data;
      drawPoint({ ...point, context });
    });

    // Get canvas state socket listening
    socket?.on('get_canvas_state', (data: GetCanvasStateSocketPayload) => {
      const { userId } = data;
      if (!canvasElement || !room || !me || userId === me.userId) return;

      const canvasState = canvasElement.toDataURL();
      const payload: SendCanvasStateSocketPayload = {
        roomId: room.roomId,
        canvasState,
        userId,
      };

      socket?.emit('send_canvas_state', payload);
    });

    // Dispatch canvas state socket listening
    socket?.on('dispatch_canvas_state', (data: DispatchCanvasStateSocketPayload) => {
      const { canvasState } = data;

      if (!canvasElement || !context) return;

      const img = new Image();
      img.src = canvasState;
      img.onload = () => {
        context.clearRect(0, 0, canvasElement.width, canvasElement.height);
        context.drawImage(img, 0, 0);
      };
    });

    return () => {
      socket?.off('update_canvas_state');
      socket?.off('get_canvas_state');
      socket?.off('clear_canvas');
      socket?.off('dispatch_canvas_state');
    };
  }, [canvasRef, room]);

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
