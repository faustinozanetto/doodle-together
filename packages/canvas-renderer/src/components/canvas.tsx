import React from 'react';
import { useCanvasContext } from '../hooks';
import { ShapeUtils } from '../shapes';
import { CanvasNode } from './canvas-node';

export const Canvas: React.FC = () => {
  const { rendererTree } = useCanvasContext();

  return (
    <div
      id="canvas"
      className="absolute top-0 left-0 w-full h-full z-100"
      style={{
        contain: 'strict',
      }}
    >
      <div className="absolute top-0 left-0 w-[1px] h-[1px] z-[3]" style={{ contain: 'layout style size' }}>
        <div id="canvas-shapes" className="relative h-full w-full z-[1]">
          {rendererTree?.getTree().map((node, index) => {
            return <CanvasNode key={index} node={node} />;
          })}
        </div>
      </div>
    </div>
  );
};
