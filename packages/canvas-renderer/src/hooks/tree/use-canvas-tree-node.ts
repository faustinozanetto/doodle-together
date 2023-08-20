import { useCanvasCore } from '@hooks/core/use-canvas-core';
import { CanvasState } from '@state/canvas-core.slice';
import { CanvasTreeNode } from '@state/canvas-tree.slice';
import { useCanvasTree } from './use-canvas-tree';

export const useCanvasTreeNode = (node: CanvasTreeNode) => {
  const { setCurrentState, currentState } = useCanvasCore();
  const { setSelectedNodeId, setActiveNodeId, clearActiveNode } = useCanvasTree();

  const onPointerEnter = () => {
    if (currentState === CanvasState.Drawing || currentState === CanvasState.Editing) return;

    setCurrentState(CanvasState.Hovering);
    setActiveNodeId(node.id);
  };

  const onPointerLeave = () => {
    if (currentState === CanvasState.Drawing || currentState === CanvasState.Editing) return;

    setCurrentState(CanvasState.Idling);
    clearActiveNode();
  };

  const onClick = () => {
    setCurrentState(CanvasState.Editing);
    setSelectedNodeId(node.id);
  };

  return {
    onPointerEnter,
    onPointerLeave,
    onClick,
  };
};
