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

  const { wrapperRef, canvasRef, handleOnMouseDown, drawPoint } = useRoomDraw(onPointDraw);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const ctx = canvasElement?.getContext('2d');

    state.socket?.emit('client_ready');

    state.socket?.on('get_canvas_state', () => {
      const canvasState = canvasRef.current?.toDataURL();
      if (!canvasState) return;

      state.socket?.emit('send_canvas_state', { canvasState, roomId: currentState.room?.roomId });
    });

    state.socket?.on('canvas_state_from_server', (data) => {
      if (!ctx || !canvasElement) return;
      console.log({ data });

      const img = new Image();
      img.src = data;
      img.onload = () => {
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        ctx.drawImage(img, 0, 0);
      };
    });

    state.socket?.on('update_canvas_state', (data) => {
      if (!ctx) return;

      const { point } = data;

      drawPoint({ ...point, context: ctx });
    });

    return () => {
      state.socket?.off('get_canvas_state');
      state.socket?.off('canvas_state_from_server');
      state.socket?.off('update_canvas_state');
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
