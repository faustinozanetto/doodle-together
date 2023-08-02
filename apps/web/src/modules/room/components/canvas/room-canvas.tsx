'use client';

import React, { useCallback, useEffect } from 'react';
import { useRoomDraw } from '@modules/room/hooks/use-room-draw';

import { actions, state } from '@modules/state/store';
import { useSnapshot } from 'valtio';
import { RoomDrawPointPayload } from '@modules/room/types/room.types';

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
    const ctx = canvasElement?.getContext('2d');

    state.socket?.on('update_canvas_state', (data) => {
      if (!ctx) return;

      const { point } = data;
      drawPoint({ ...point, context: ctx });
    });

    state.socket?.on('clear_canvas', () => {
      if (!ctx) return;
      clearCanvas();
    });

    return () => {
      state.socket?.off('update_canvas_state');
      state.socket?.off('clear_canvas');
    };
  }, [canvasRef, currentState.room?.roomId]);

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
