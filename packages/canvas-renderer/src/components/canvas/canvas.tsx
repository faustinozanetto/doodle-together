import React, { ElementRef, useEffect, useRef } from 'react';
import { useCanvasCore } from '@hooks/core/use-canvas-core';
import { useCanvasTree } from '@hooks/tree/use-canvas-tree';
import { useCanvasMouseEvents } from '@hooks/use-canvas-mouse-events';
import { ShapeUtils } from '@shapes/shape-utils';
import CanvasNodesContainer from './canvas-nodes-container';
import { CanvasNode } from './canvas-node';

export const Canvas = () => {
  const canvasRef = useRef<ElementRef<'div'>>(null);

  const { setCanvasRef, selectedShape } = useCanvasCore();
  const { addNode, updateNode, getLastNode, getNodes } = useCanvasTree();

  const {
    onPointerMove,
    onPointerDown,
    onPointerUp,
    isMouseDown,
    cursorPoint,
    originPoint,
    points,
    topLeftPoint,
    translatedPoints,
  } = useCanvasMouseEvents({
    onPointerUpCallback() {},
    onPointerDownCallback() {
      addNode(selectedShape);
    },
    onPointerMoveCallback() {
      const lastNode = getLastNode();
      if (!lastNode || !topLeftPoint.current || !originPoint.current) return;

      // Get the shape class and call the mouseUpdate method to get the updated shape data and pass to state.
      const shapeClass = ShapeUtils.getShapeClass(lastNode.type);

      const updatedData = shapeClass.mouseUpdate(lastNode, {
        cursorPoint: cursorPoint.current,
        originPoint: originPoint.current,
        points: points.current,
        topLeftPoint: topLeftPoint.current,
        translatedPoints: translatedPoints.current,
      });

      updateNode(lastNode.id, updatedData);
    },
  });

  // Canvas ref passed to context
  useEffect(() => {
    if (canvasRef.current) {
      setCanvasRef(canvasRef.current);
    }
  }, [canvasRef]);

  return (
    <div
      ref={canvasRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerDown={onPointerDown}
      style={{
        transformOrigin: 'center center',
      }}
    >
      <div
        className="absolute inset-0 bg-red-500 h-6 w-6 rounded-lg z-[800] pointer-events-none"
        style={{
          transform: `translate(${originPoint.current?.x}px, ${originPoint.current?.y}px)`,
        }}
      />
      <div
        className="absolute inset-0 bg-blue-500 h-6 w-6 rounded-lg z-[800] pointer-events-none"
        style={{
          transform: `translate(${topLeftPoint.current?.x}px, ${topLeftPoint.current?.y}px)`,
        }}
      />
      <div
        className="absolute inset-0 bg-violet-500 h-6 w-6 rounded-lg z-[800] pointer-events-none"
        style={{
          transform: `translate(${cursorPoint.current?.x}px, ${cursorPoint.current?.y}px)`,
        }}
      />
      <CanvasNodesContainer>
        {getNodes().map((node) => {
          return <CanvasNode key={node.id} node={node} />;
        })}
      </CanvasNodesContainer>
    </div>
  );
};
