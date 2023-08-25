import { ElementRef, useEffect, useRef } from 'react';
import { useCanvasCore } from '@hooks/core/use-canvas-core';
import { useCanvasTree } from '@hooks/tree/use-canvas-tree';
import { useCanvasEvents } from '@hooks/canvas/use-canvas-events';
import { ShapeUtils } from '@utils/shape-utils';
import { CanvasNodesContainer } from './canvas-nodes-container';
import { CanvasNode } from './node/canvas-node';
import { useCanvasCustomization } from '@hooks/customization/use-canvas-customization';
import { CanvasState } from '@state/canvas-core.slice';
import { CanvasShapeToolTypes } from '@shapes/types';
import { ToolUtils } from '@utils/tool-utils';
import { CanvasBackground } from './canvas-background';
import { CanvasSerializer } from 'serialization/canvas-serializer';
import { useCanvasDrag } from '@hooks/canvas/use-canvas-drag';
import { useCanvasStyles } from '@hooks/canvas/use-canvas-styles';
import { useCanvasDraw } from '@hooks/canvas/use-canvas-draw';

export const Canvas = () => {
  const canvasRef = useRef<ElementRef<'div'>>(null);

  const { customization } = useCanvasCustomization();

  const {
    setNodes,
    addNode,
    updateNode,
    getLastNode,
    setActiveNodeId,
    clearActiveNode,
    clearSelectedNode,
    nodes,
    activeNodeId,
    selectedNodeId,
  } = useCanvasTree();

  const { canvasClassNames, canvasStyles } = useCanvasStyles();

  const { setCanvasRef, setCurrentState, currentState, selectedToolType } = useCanvasCore();
  const { onDragPointerDown, onDragPointerMove, onDragPointerUp } = useCanvasDrag();
  const { onDrawPointerDown, onDrawPointerMove, onDrawPointerUp } = useCanvasDraw({
    onPointerDownCallback(event) {
      // If current  tool is shape type, add new node and switch to drawing.
      if (!ToolUtils.isShapeTool(selectedToolType)) return;
      if (currentState !== CanvasState.Idling) return;

      clearSelectedNode();
      setCurrentState(CanvasState.Drawing);

      // Create a node with selected shape type global customization and set as active one.
      const addedNode = addNode(selectedToolType as CanvasShapeToolTypes, customization);
      setActiveNodeId(addedNode.id);
    },
    onPointerUpCallback(event) {
      // If current tool is shape type, clear active node and switch to idling.
      if (!ToolUtils.isShapeTool(selectedToolType)) return;
      if (currentState !== CanvasState.Drawing) return;

      clearActiveNode();
      setCurrentState(CanvasState.Idling);
    },
    onPointerMoveCallback(data) {
      // If current tool is shape type, call mouseUpdate method on current active node.
      if (!ToolUtils.isShapeTool(selectedToolType)) return;
      if (currentState !== CanvasState.Drawing) return;

      const lastNode = getLastNode();
      if (!lastNode || !data.topLeftPoint || !data.originPoint) return;

      // Get the shape class and call the mouseUpdate method to get the updated shape data and pass to state.
      const shapeClass = ShapeUtils.getShapeClass(lastNode.type);

      const updatedData = shapeClass.mouseUpdate(lastNode, data);

      updateNode(lastNode.id, updatedData);
    },
  });

  const events = useCanvasEvents({
    onPointerUpCallback(event) {
      if (selectedToolType === 'hand') {
        onDragPointerUp(event);
        setCurrentState(CanvasState.Idling);
        return;
      }

      if (ToolUtils.isShapeTool(selectedToolType)) {
        onDrawPointerUp(event);
        return;
      }
    },
    onPointerDownCallback(event) {
      if (selectedToolType === 'hand') {
        setCurrentState(CanvasState.Dragging);
        clearActiveNode();
        clearSelectedNode();
        onDragPointerDown(event);
        return;
      }

      if (ToolUtils.isShapeTool(selectedToolType)) {
        onDrawPointerDown(event);
        return;
      }
    },
    onPointerMoveCallback(event) {
      if (selectedToolType === 'hand') {
        onDragPointerMove(event);
        return;
      }

      if (ToolUtils.isShapeTool(selectedToolType)) {
        onDrawPointerMove(event);
        return;
      }
    },
    onClickCallback(event) {
      // If editing state switch back to idling and clear selected node.
      if (currentState === CanvasState.Editing) {
        clearSelectedNode();
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

  useEffect(() => {
    const nodesFromStorage = localStorage.getItem('nodes');
    if (!nodesFromStorage) return;

    const serializer = new CanvasSerializer();
    const deserialized = serializer.deserialize(nodesFromStorage);
    setNodes(deserialized);
  }, []);

  return (
    <div ref={canvasRef} className={canvasClassNames} style={canvasStyles} {...events}>
      <CanvasBackground />
      <span className="absolute top-2 left-2 pointer-events-none select-none">{`STATE: ${currentState} | ACTIVE: ${activeNodeId} | SELECTED: ${selectedNodeId}`}</span>
      <button
        onClick={(e) => {
          const serializer = new CanvasSerializer();
          const serialized = serializer.serialize(nodes);
          localStorage.setItem('nodes', serialized);
        }}
        className="absolute top-10 left-10"
      >
        serialize
      </button>

      <CanvasNodesContainer>
        {nodes.map((node) => {
          return <CanvasNode key={node.id} node={node} />;
        })}
      </CanvasNodesContainer>
    </div>
  );
};
