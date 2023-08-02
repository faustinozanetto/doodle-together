'use client';

import React, { useCallback, useEffect } from 'react';
import { useRoomDraw } from '@modules/room/hooks/use-room-draw';

import { actions, state } from '@modules/state/store';
import { useSnapshot } from 'valtio';
import { RoomDrawPointPayload } from '@modules/room/types/room.types';
import {
  DispatchCanvasStateSocketPayload,
  GetCanvasStateSocketPayload,
  SendCanvasStateSocketPayload,
} from '@doodle-together/types';
import { stat } from 'fs';

const RoomCanvas: React.FC = () => {
  const currentState = useSnapshot(state);

  const onPointDraw = useCallback(
    (data: RoomDrawPointPayload) => {
      actions.sendDrawPoint(data);
    },
    [currentState.room?.roomId]
  );
  const onCanvasCleared = useCallback(() => {
    actions.sendCanvasCleared();
  }, [currentState.room?.roomId]);

  const { wrapperRef, canvasRef, handleOnMouseDown, drawPoint, clearCanvas } = useRoomDraw({
    onPointDraw,
    onCanvasCleared,
  });

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const context = canvasElement?.getContext('2d');

    // Clear canvas socket listening
    state.socket?.on('clear_canvas', () => {
      if (!context) return;

      clearCanvas();
    });

    // Update canvas state socket listening
    state.socket?.on('update_canvas_state', (data) => {
      if (!context) return;

      const { point } = data;
      drawPoint({ ...point, context });
    });

    // Get canvas state socket listening
    state.socket?.on('get_canvas_state', (data: GetCanvasStateSocketPayload) => {
      const { userId } = data;
      if (!canvasElement || currentState.room === undefined || userId === state.me?.userId) return;

      const canvasState = canvasElement.toDataURL();
      const payload: SendCanvasStateSocketPayload = {
        roomId: currentState.room.roomId,
        canvasState,
        userId,
      };

      state.socket?.emit('send_canvas_state', payload);
    });

    // Dispatch canvas state socket listening
    state.socket?.on('dispatch_canvas_state', (data: DispatchCanvasStateSocketPayload) => {
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
      state.socket?.off('update_canvas_state');
      state.socket?.off('get_canvas_state');
      state.socket?.off('clear_canvas');
      state.socket?.off('dispatch_canvas_state');
    };
  }, [canvasRef, currentState.room]);

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
