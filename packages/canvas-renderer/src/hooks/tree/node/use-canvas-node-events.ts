import { useCanvasCore } from '@hooks/core/use-canvas-core';
import { CanvasState } from '@state/canvas-core.slice';
import { ToolUtils } from '@utils/tool-utils';
import { useCanvasTree } from '../use-canvas-tree';
import { CanvasTreeNode } from '@state/canvas-tree.slice';
import { useCanvasTreeNodeDrag } from './use-canvas-node-drag';

type UseCanvasNodeEvents = {
  events: {
    onPointerEnter: (event: React.PointerEvent<HTMLDivElement>) => void;
    onPointerLeave: (event: React.PointerEvent<HTMLDivElement>) => void;
    onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
    onPointerUp: (event: React.PointerEvent<HTMLDivElement>) => void;
    onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  };
};

export const useCanvasTreeNodeEvents = (node: CanvasTreeNode): UseCanvasNodeEvents => {
  const { setCurrentState, currentState, selectedToolType } = useCanvasCore();

  const { setSelectedNodeId, setActiveNodeId, clearActiveNode, clearSelectedNode, removeNode } = useCanvasTree();

  const { onDragPointerMove, onDragPointerDown, onDragPointerUp } = useCanvasTreeNodeDrag(node);

  const onPointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (selectedToolType !== 'select') return;

    if (currentState === CanvasState.Dragging) return;

    // If we are idling switch to hovering.
    if (currentState === CanvasState.Idling) {
      setCurrentState(CanvasState.Hovering);
      setActiveNodeId(node.id);
    }
  };

  const onPointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (selectedToolType !== 'select') return;

    // If we are hovering, stop it.
    if (currentState === CanvasState.Hovering) {
      setCurrentState(CanvasState.Idling);
      clearActiveNode();
    }
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (selectedToolType !== 'select') return;

    // If we are dragging, update dragging
    if (currentState === CanvasState.Dragging) onDragPointerMove(event);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (selectedToolType !== 'select') return;

    // If we are hovering or editing, switch to dragging
    if (currentState === CanvasState.Hovering || currentState === CanvasState.Editing) {
      setCurrentState(CanvasState.Dragging);
      setSelectedNodeId(node.id);
      onDragPointerDown(event);
    }
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (selectedToolType !== 'select') return;

    // If we are dragging, stop dragging and switch to editing.
    if (currentState === CanvasState.Dragging) {
      setCurrentState(CanvasState.Editing);
      onDragPointerUp(event);
    }
  };

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ToolUtils.isUtilityTool(selectedToolType)) return;

    if (currentState === CanvasState.Dragging) return;

    // Prevent canvas from triggering on click.
    event.stopPropagation();

    // If tool is select switch to editing state.
    if (selectedToolType === 'select') {
      setCurrentState(CanvasState.Editing);
      setSelectedNodeId(node.id);
      clearActiveNode();
    }
    // If tool is eraser delete node
    else if (selectedToolType === 'eraser') {
      setCurrentState(CanvasState.Idling);
      removeNode(node.id);
      clearActiveNode();
      clearSelectedNode();
    }
  };

  return {
    events: {
      onPointerEnter,
      onPointerLeave,
      onPointerMove,
      onPointerUp,
      onPointerDown,
      onClick,
    },
  };
};
