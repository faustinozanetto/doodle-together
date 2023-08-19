import React, { ElementRef, useEffect, useRef } from 'react';

import { CanvasNode } from './canvas-node';
import { CanvasShapeTypes, ICanvasBoxShape, ICanvasCircleShape, ICanvasDrawShape, ShapeUtils } from '../../shapes';
import { useCanvas } from '../../hooks/use-canvas';
import { useCanvasContext } from '../../hooks';
import { CanvasActionType } from '../../context/canvas/types';
import { useCanvasMouseEvents } from '../../hooks/use-canvas-mouse-events';
import CanvasNodesContainer from './canvas-nodes-container';

export const Canvas: React.FC = () => {
  const canvasRef = useRef<ElementRef<'div'>>(null);

  const { dispatch } = useCanvasContext();
  const { addNode, updateNode, getLastNode, getNodes } = useCanvas();

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
      addNode(CanvasShapeTypes.Box);
    },
    onPointerMoveCallback() {
      const lastNode = getLastNode<ICanvasBoxShape>();
      if (!lastNode || !topLeftPoint.current || !originPoint.current) return;

      // Get the shape class and call the mouseUpdate method to get the updated shape data and pass to state.
      const shapeClass = ShapeUtils.getShapeClass(CanvasShapeTypes.Box);

      const updatedData = shapeClass.mouseUpdate(lastNode, {
        cursorPoint: cursorPoint.current,
        originPoint: originPoint.current,
        points: points.current,
        topLeftPoint: topLeftPoint.current,
        translatedPoints: translatedPoints.current,
      }) as ICanvasBoxShape;

      updateNode<ICanvasBoxShape>(lastNode.id, updatedData);
    },
  });

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

  return (
    <div className="absolute top-0 left-0 w-full h-full max-w-full max-h-full p-0 m-0 overscroll-none overflow-clip">
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
    </div>
  );
};
