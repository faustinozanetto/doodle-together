import React, { ElementRef, useEffect, useRef, useState } from 'react';

import { CanvasNode } from './canvas-node';
import { CanvasPoint, CanvasShapeTypes, ICanvasBoxShape, ICanvasCircleShape, ICanvasDrawShape } from '../shapes';
import { useCanvas } from '../hooks/use-canvas';
import { useCanvasContext } from '../hooks';
import { CanvasActionType } from '../context/types';
import { useCanvasBounds } from '../hooks/use-canvas-bounds';
import { useCanvasMouseEvents } from '../hooks/use-canvas-mouse-events';

export const Canvas: React.FC = () => {
  const canvasRef = useRef<ElementRef<'div'>>(null);

  const { dispatch } = useCanvasContext();
  const { addNode, updateNode, getLastNode, getNodes } = useCanvas();

  const [mouseDown, setMouseDown] = useState<boolean>(false);

  const origin = useRef<CanvasPoint | null>();
  const topLeft = useRef<CanvasPoint>({ x: 0, y: 0 });
  const points = useRef<CanvasPoint[]>([]);
  const shiftedPoints = useRef<CanvasPoint[]>([]);

  const { bounds } = useCanvasBounds();
  const { onPointerMove, cursorPoint } = useCanvasMouseEvents();

  useEffect(() => {
    if (canvasRef.current) {
      dispatch({
        type: CanvasActionType.SET_CANVAS_REF,
        payload: {
          ref: canvasRef.current,
        },
      });
    }
  }, [canvasRef]);

  const handleOnMouseDown = () => {
    setMouseDown(true);
    addNode(CanvasShapeTypes.Circle);

    // Initialize origin
    origin.current = cursorPoint;
    topLeft.current = cursorPoint;

    const handleOnMouseRelease = () => {
      setMouseDown(false);

      origin.current = null;
      points.current = [];
      shiftedPoints.current = [];
    };

    window.addEventListener('mouseup', handleOnMouseRelease);
  };

  const handleOnMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!mouseDown || !origin.current) return;

    // The new adjusted point
    const newPoint = {
      x: cursorPoint.x - origin.current?.x!,
      y: cursorPoint.y - origin.current?.y!,
    };

    // Don't add duplicate points.
    if (cursorPoint.x === newPoint.x && cursorPoint.y === newPoint.y) return;

    // Add the new adjusted point to the points array
    points.current.push(newPoint);

    // Does the input point create a new top left?
    const prevTopLeft = topLeft;

    const newTopLeft = {
      x: Math.min(topLeft.current.x, cursorPoint.x),
      y: Math.min(topLeft.current.y, cursorPoint.y),
    };

    const delta = {
      x: newTopLeft.x - origin.current?.x!,
      y: newTopLeft.y - origin.current?.y!,
    };

    let temppoints: CanvasPoint[];

    if (prevTopLeft.current.x !== newTopLeft.x || prevTopLeft.current.y !== newTopLeft.y) {
      topLeft.current = newTopLeft;

      temppoints = points.current.map((pt) => {
        return {
          x: pt.x - delta.x,
          y: pt.y - delta.y,
        };
      });
    } else {
      const sub = {
        x: topLeft.current.x - origin.current?.x!,
        y: topLeft.current.y - origin.current?.y!,
      };
      const newP = {
        x: newPoint.x - sub.x,
        y: newPoint.y - sub.y,
      };
      temppoints = [...shiftedPoints.current, newP];
    }

    shiftedPoints.current = temppoints;

    const lastNode = getLastNode<ICanvasCircleShape>();
    if (!lastNode) return;

    /*
    updateNode<ICanvasDrawShape>(lastNode.id, {
      ...lastNode,
      position: topLeft.current,
      props: {
        ...lastNode.props,
        points: temppoints,
      },
    });*/

    const radius = Math.max(Math.abs(origin.current.x - cursorPoint.x), Math.abs(origin.current.y - cursorPoint.y));

    updateNode<ICanvasCircleShape>(lastNode.id, {
      ...lastNode,
      position: origin.current,
      props: {
        ...lastNode.props,
        radius,
      },
    });

    /*
    const width = Math.abs(cursor.current.x - origin.current.x);
    const height = Math.abs(cursor.current.y - origin.current.y);

    let finalPoint: CanvasPoint = origin.current;

    if (origin.current.x < cursor.current.x && origin.current.y > cursor.current.y) {
      finalPoint = {
        x: origin.current.x,
        y: cursor.current.y,
      };
    } else if (origin.current.x > cursor.current.x && origin.current.y > cursor.current.y) {
      finalPoint = {
        x: cursor.current.x,
        y: cursor.current.y,
      };
    } else if (origin.current.x > cursor.current.x && origin.current.y < cursor.current.y) {
      finalPoint = {
        x: cursor.current.x,
        y: origin.current.y,
      };
    } else if (origin.current.x < cursor.current.x && origin.current.y < cursor.current.y) {
    }

    updateNode<ICanvasBoxShape>(lastNode.id, {
      ...lastNode,
      position: finalPoint,
      props: {
        ...lastNode.props,
        size: {
          width,
          height,
        },
      },
    })*/
  };

  return (
    <div
      ref={canvasRef}
      onMouseMove={handleOnMouseMove}
      onMouseDown={handleOnMouseDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerDown={onPointerDown}
      className="absolute inset-0 w-full h-full"
      style={{
        transformOrigin: 'center center',
      }}
    >
      <div
        className="absolute inset-0 bg-red-500 h-6 w-6 rounded-lg z-[800] pointer-events-none"
        style={{
          transform: `translate(${origin.current?.x}px, ${origin.current?.y}px)`,
        }}
      />
      <div
        className="absolute inset-0 bg-blue-500 h-6 w-6 rounded-lg z-[800] pointer-events-none"
        style={{
          transform: `translate(${topLeft.current?.x}px, ${topLeft.current?.y}px)`,
        }}
      />
      {/* <div
        className="absolute inset-0 bg-green-500 h-6 w-6 rounded-lg z-[800] pointer-events-none"
        style={{
          transform: `translate(${last.current?.x}px, ${last.current?.y}px)`,
        }}
      /> */}
      <div
        className="absolute inset-0 bg-violet-500 h-6 w-6 rounded-lg z-[800] pointer-events-none"
        style={{
          transform: `translate(${cursorPoint.x}px, ${cursorPoint.y}px)`,
        }}
      />
      <div
        className="absolute top-0 left-0 w-1 h-1 pointer-events-none z-[200]"
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
