'use client';

import React, { useCallback, useContext, useEffect } from 'react';
import { useRoomDraw } from '@modules/room/hooks/use-room-draw';

import { useRoomContext } from '@modules/room/hooks/use-room-context';

import { CanvasPoint } from '@modules/room/types/room.types';
import { SocketContext } from '@modules/socket/context/socket.context';

const RoomCanvas: React.FC = () => {
  const { state } = useRoomContext();
  const { socket } = useContext(SocketContext);

  const onPointDraw = useCallback(
    (point: CanvasPoint, prevPoint: CanvasPoint | null) => {
      if (!socket) return;

      socket.emit('draw-point', { roomId: state.roomId, point });
    },
    [state.roomId]
  );

  const { wrapperRef, canvasRef, handleOnMouseDown } = useRoomDraw(onPointDraw);

  useEffect(() => {
    if (!socket) return;

    socket.on('canvas-update', (data) => {
      console.log('Update Canvas');
    });

    return () => {
      socket.off('canvas-update');
    };
  }, [canvasRef, state.roomId]);

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
