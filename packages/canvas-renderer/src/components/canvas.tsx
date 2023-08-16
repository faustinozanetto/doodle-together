import React from 'react';
import { CanvasProvider } from '../context/canvas-context';

export const Canvas: React.FC = () => {
  return (
    <CanvasProvider>
      <div id="canvas-wrapper" className="h-full w-full">
        <svg id="canvas">
          <g id="canvas-shapes"></g>
        </svg>
      </div>
    </CanvasProvider>
  );
};
