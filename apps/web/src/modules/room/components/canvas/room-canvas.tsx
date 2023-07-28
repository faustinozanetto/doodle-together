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
        onMouseDown={handleOnMouseDown}
        width={0}
        height={0}
        className="cursor-pointer"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(217, 226, 233) 1px, transparent 1px), linear-gradient(rgb(217, 226, 233) 1px, transparent 1px)',
          backgroundSize: '10px 10px',
        }}
      />
    </div>
  );
};

export default RoomCanvas;
