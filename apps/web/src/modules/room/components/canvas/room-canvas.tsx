'use client';

import React, { ElementRef, useRef } from 'react';

const RoomCanvas: React.FC = () => {
  const canvasRef = useRef<ElementRef<'canvas'>>(null);

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      className="w-full h-full bg-neutral-50"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgb(217, 226, 233) 1px, transparent 1px), linear-gradient(rgb(217, 226, 233) 1px, transparent 1px)',
        backgroundSize: '10px 10px',
      }}
    />
  );
};

export default RoomCanvas;
