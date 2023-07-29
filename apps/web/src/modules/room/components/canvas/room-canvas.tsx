'use client';

import React, { useCallback, useContext, useEffect } from 'react';
import { useRoomDraw } from '@modules/room/hooks/use-room-draw';

import { useRoomContext } from '@modules/room/hooks/use-room-context';

import { CanvasPoint } from '@doodle-together/types';
import { actions, state } from '@modules/state/store';

const RoomCanvas: React.FC = () => {
  const { state: roomState } = useRoomContext();

  const onPointDraw = useCallback(
    (point: CanvasPoint, prevPoint: CanvasPoint | null) => {
      actions.sendDrawPoint(point);
    },
    [roomState.roomId]
  );

  useEffect(() => {
    state.socket?.on('update_canvas', (data) => {
      console.log('Update canvas ' + JSON.stringify(data));
    });

    return () => {
      state.socket?.off('update_canvas');
    };
  }, [state.socket]);

  const { wrapperRef, canvasRef, handleOnMouseDown } = useRoomDraw(onPointDraw);

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
