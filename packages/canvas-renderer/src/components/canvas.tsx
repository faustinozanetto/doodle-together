import React, { ElementRef, useRef, useState } from 'react';

import { CanvasNode } from './canvas-node';
import { CanvasPoint, CanvasShapeTypes, ICanvasBoxShape, ICanvasCircleShape } from '../shapes';
import { useCanvas } from '../hooks/use-canvas';

export const Canvas: React.FC = () => {
  const canvasRef = useRef<ElementRef<'div'>>(null);

  const { addNode, updateNode, getLastNode, getNodes } = useCanvas();

  const [mouseDown, setMouseDown] = useState<boolean>(false);

  const points = useRef<CanvasPoint[]>([]);
  const startPoint = useRef<CanvasPoint | null>();
  const endPoint = useRef<CanvasPoint>();

  const handleOnMouseDown = () => {
    setMouseDown(true);
    addNode(CanvasShapeTypes.Box);

    const handleOnMouseRelease = () => {
      setMouseDown(false);

      startPoint.current = null;

      points.current = [];
    };

    window.addEventListener('mouseup', handleOnMouseRelease);
  };

  const handleOnMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;

    if (!mouseDown || !canvasRef.current) return;

    const { left, top } = canvasRef.current.getBoundingClientRect();
    const point = {
      x: clientX - left,
      y: clientY - top,
    };

    if (!startPoint.current) {
      startPoint.current = point;
    }

    points.current.push({ x: point.x, y: point.y });

    const lastNode = getLastNode<ICanvasBoxShape>();
    if (!lastNode || !points.current.length) return;

    const lastPoint = points.current[points.current.length - 1];
    endPoint.current = lastPoint;

    // updateNode<ICanvasCircleShape>(lastNode.id, {
    //   ...lastNode,
    //   props: {
    //     ...lastNode.props,
    //     radius,
    //   },
    // });

    const width = Math.abs(endPoint.current.x - startPoint.current.x);
    const height = Math.abs(endPoint.current.y - startPoint.current.y);

    let finalPoint: CanvasPoint = startPoint.current;

    if (startPoint.current.x < endPoint.current.x && startPoint.current.y > endPoint.current.y) {
      console.log('no need to update quadrant 1');
      finalPoint = {
        x: startPoint.current.x,
        y: endPoint.current.y,
      };
    } else if (startPoint.current.x > endPoint.current.x && startPoint.current.y > endPoint.current.y) {
      console.log('no need to update quadrant 2');
      finalPoint = {
        x: endPoint.current.x,
        y: endPoint.current.y,
      };
    } else if (startPoint.current.x > endPoint.current.x && startPoint.current.y < endPoint.current.y) {
      console.log('no need to update quadrant 3');
      finalPoint = {
        x: endPoint.current.x,
        y: startPoint.current.y,
      };
    } else if (startPoint.current.x < endPoint.current.x && startPoint.current.y < endPoint.current.y) {
      console.log('no need to update quadrant 4');
    }

    updateNode<ICanvasBoxShape>(lastNode.id, {
      ...lastNode,
      position: startPoint.current,
      props: {
        ...lastNode.props,
        point: finalPoint,
        size: {
          width,
          height,
        },
      },
    });
  };

  return (
    <div
      ref={canvasRef}
      onMouseMove={handleOnMouseMove}
      onMouseDown={handleOnMouseDown}
      className="absolute inset-0 w-full h-full"
      style={{
        transformOrigin: 'center center',
      }}
    >
      <div
        className="absolute inset-0 bg-red-500 h-6 w-6 rounded-lg z-[800] pointer-events-none"
        style={{
          transform: `translate(${startPoint.current?.x}px, ${startPoint.current?.y}px)`,
        }}
      />
      <div
        className="absolute inset-0 bg-green-500 h-6 w-6 rounded-lg z-[800] pointer-events-none"
        style={{
          transform: `translate(${endPoint.current?.x}px, ${endPoint.current?.y}px)`,
        }}
      />
      <div
        className="absolute top-0 left-0 w-1 h-1 pointer-events-none"
        style={{
          transform: 'scale(1)',
          transformOrigin: 'center center',
        }}
      >
        {getNodes().map((node) => {
          return <CanvasNode key={node.id} node={node} />;
        })}
      </div>
    </div>
  );
};
