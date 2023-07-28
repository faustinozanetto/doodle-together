'use client';

import React from 'react';
import { useRoomDraw } from '@modules/room/hooks/use-room-draw';

const RoomCanvas: React.FC = () => {
  const { wrapperRef, canvasRef, handleOnMouseDown } = useRoomDraw();

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
