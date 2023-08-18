import React, { ElementRef, useRef, useState } from 'react';

import { CanvasNode } from './canvas-node';
import { CanvasPoint, CanvasShapeTypes, ICanvasBoxShape, ICanvasDrawShape } from '../shapes';
import { useCanvas } from '../hooks/use-canvas';

export const Canvas: React.FC = () => {
  const canvasRef = useRef<ElementRef<'svg'>>(null);

  const { addNode, updateNode, getLastNode, getNodes } = useCanvas();

  const [mouseDown, setMouseDown] = useState<boolean>(false);

  const points = useRef<CanvasPoint[]>([]);

  const handleOnMouseDown = () => {
    setMouseDown(true);
    addNode(CanvasShapeTypes.Box);

    const handleOnMouseRelease = () => {
      setMouseDown(false);

      points.current = [];
    };

    window.addEventListener('mouseup', handleOnMouseRelease);
  };

  const handleOnMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const { clientX, clientY } = event;

    if (!mouseDown || !canvasRef.current) return;

    const { left, top } = canvasRef.current.getBoundingClientRect();
    const point = {
      x: clientX - left,
      y: clientY - top,
    };

    points.current.push({ x: point.x, y: point.y });

    const lastNode = getLastNode<ICanvasBoxShape>();
    if (!lastNode) return;

    const firstPoint = points.current[0];
    const lastPoint = points.current[points.current.length - 1];

    updateNode<ICanvasBoxShape>(lastNode.id, {
      ...lastNode,
      props: { ...lastNode.props, leftTop: firstPoint, bottomRight: lastPoint },
    });
  };

  return (
    <svg
      ref={canvasRef}
      id="canvas"
      className="absolute overflow-hidden top-0 left-0 w-full h-full z-100"
      style={{
        pointerEvents: 'all',
        transformOrigin: 'center center',
        contain: 'layout style size',
      }}
      onMouseMove={handleOnMouseMove}
      onMouseDown={handleOnMouseDown}
    >
      <g id="canvas-shapes" transform="scale(1)">
        {getNodes().map((node) => {
          return <CanvasNode key={node.id} node={node} />;
        })}
      </g>
    </svg>
  );
};
