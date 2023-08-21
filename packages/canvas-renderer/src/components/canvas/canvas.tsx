import { ElementRef, useEffect, useRef } from 'react';
import { useCanvasCore } from '@hooks/core/use-canvas-core';
import { useCanvasTree } from '@hooks/tree/use-canvas-tree';
import { useCanvasMouseEvents } from '@hooks/use-canvas-mouse-events';
import { ShapeUtils } from '@utils/shape-utils';
import { CanvasNodesContainer } from './canvas-nodes-container';
import { CanvasNode } from './canvas-node';
import { useCanvasCustomization } from '@hooks/customization/use-canvas-customization';
import { CanvasDebugIndicators } from './canvas-debug-indicators';
import { CanvasState } from '@state/canvas-core.slice';
import { CanvasShapeToolTypes } from '@shapes/types';
import { ToolUtils } from '@utils/tool-utils';
import clsx from 'clsx';

export const Canvas = () => {
  const canvasRef = useRef<ElementRef<'div'>>(null);

  const { customization } = useCanvasCustomization();
  const { setCanvasRef, setCurrentState, currentState, selectedToolType } = useCanvasCore();
  const { addNode, updateNode, getLastNode, setActiveNodeId, clearActiveNode, clearSelectedNode, nodes } =
    useCanvasTree();

  const {
    onPointerMove,
    onPointerDown,
    onPointerUp,
    onClick,
    cursorPoint,
    originPoint,
    points,
    topLeftPoint,
    translatedPoints,
  } = useCanvasMouseEvents({
    onPointerUpCallback() {
      if (!ToolUtils.isShapeTool(selectedToolType)) return;

      clearActiveNode();
      setCurrentState(CanvasState.Idling);
    },
    onPointerDownCallback() {
      if (!ToolUtils.isShapeTool(selectedToolType)) return;

      clearSelectedNode();
      setCurrentState(CanvasState.Drawing);

      // Create a node with selected shape type global customization and set as active one.
      const addedNode = addNode(selectedToolType as CanvasShapeToolTypes, customization);
      setActiveNodeId(addedNode.id);
    },
    onPointerMoveCallback() {
      if (!ToolUtils.isShapeTool(selectedToolType)) return;

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
    onClickCallback() {
      // If was with select tool and editing, clicking on canvas sets back to idling.
      if (selectedToolType === 'select' && currentState === CanvasState.Editing) {
        clearSelectedNode();
        clearActiveNode();
        setCurrentState(CanvasState.Idling);
      }
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
      className={clsx('absolute inset-0 w-full h-full overflow-hidden', selectedToolType !== 'select' && 'cursor-cell')}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerDown={onPointerDown}
      onClick={onClick}
      style={{
        transformOrigin: 'center center',
      }}
    >
      <span className="absolute left-1/2 top-0 pointer-events-none">{currentState}</span>
      {/* <CanvasDebugIndicators
        cursorPoint={cursorPoint.current}
        originPoint={originPoint.current}
        topLeftPoint={topLeftPoint.current}
      /> */}
      <CanvasNodesContainer>
        {nodes.map((node) => {
          return <CanvasNode key={node.id} node={node} />;
        })}
      </CanvasNodesContainer>
    </div>
  );
};
