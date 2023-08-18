import React, { ElementRef, useEffect, useRef, useState } from 'react';
import { useCanvasContext } from '../hooks';

import { CanvasNode } from './canvas-node';
import { CanvasShapeTypes } from '../shapes';
import { CanvasActionType } from '../context/types';

export const Canvas: React.FC = () => {
  const canvasRef = useRef<ElementRef<'svg'>>(null);

  const { state, dispatch } = useCanvasContext();

  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const points = useRef<number[][]>([]);

  const handleOnMouseDown = () => {
    setMouseDown(true);
    dispatch({
      type: CanvasActionType.ADD_NODE,
      payload: {
        type: CanvasShapeTypes.Draw,
      },
    });

    console.log('Created nodee');
  };

  const handleOnMouseRelease = () => {
    setMouseDown(false);

    points.current = [];
  };

  const handlePointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    const { clientX, clientY } = event;

    if (!mouseDown || !canvasRef.current) return;

    const { left, top } = canvasRef.current.getBoundingClientRect();
    const currentPoint = {
      x: clientX - left,
      y: clientY - top,
    };

    points.current.push([currentPoint.x, currentPoint.y]);
    const shape = state.nodes[state.nodes.length - 1];
    if (!shape) return;

    dispatch({
      type: CanvasActionType.UPDATE_NODE,
      payload: {
        id: shape.id,
        data: {
          ...shape,
          points: points.current,
        },
      },
    });
    /*
    const shape = tree.children[tree.children.length - 1].node as ICanvasDrawShape | undefined;
    if (!shape) return;

    setTree((prev) => {
      const updatedTree = structuredClone(prev);
      const current = updatedTree.children.findIndex((child) => child.node.id === shape.id);
      if (current === -1) return prev;

      const updatedPoints = [...updatedTree.children[current].node.points, [currentPoint.x, currentPoint.y]];
      updatedTree.children[current].node.points = updatedPoints;
      return updatedTree;
    });

    console.log({ points: shape.points });*/

    // shape.setPoints(updatedPoints);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleOnMouseRelease);

    return () => {
      window.removeEventListener('mouseup', handleOnMouseRelease);
    };
  }, [mouseDown]);

  return (
    <svg
      ref={canvasRef}
      id="canvas"
      className="absolute overflow-hidden top-0 left-0 w-full h-full z-100"
      style={{
        pointerEvents: 'all',
      }}
      // onPointerMove={handlePointerMove}
      onMouseMove={handlePointerMove}
      onMouseDown={handleOnMouseDown}
    >
      <g id="canvas-shapes" transform="scale(1)">
        {state.nodes.map((node) => {
          return <CanvasNode key={node.id} node={node} />;
        })}
      </g>
    </svg>
  );
};
