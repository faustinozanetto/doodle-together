import { CanvasShapes } from '@shapes/types';
import { useCanvasTreeStore } from '@state/canvas-tree.slice';

export const useCanvasTree = () => {
  const {
    setNodes,
    addNode,
    removeNode,
    setSelectedNodeId,
    clearSelectedNode,
    updateNode,
    setActiveNodeId,
    clearActiveNode,
    nodes,
    selectedNodeId,
    activeNodeId,
  } = useCanvasTreeStore();

  const nodesIsEmpty = () => {
    return nodes.length === 0;
  };

  const getNode = <T extends CanvasShapes>(id: string): CanvasShapes | null => {
    const node = nodes.find((node) => node.id === id);
    if (!node) return null;
    return node as T;
  };

  const getSelectedNode = <T extends CanvasShapes>() => {
    if (!selectedNodeId) return null;
    return getNode<T>(selectedNodeId);
  };

  const getActiveNode = <T extends CanvasShapes>() => {
    if (!activeNodeId) return null;
    return getNode<T>(activeNodeId);
  };

  const getFirstNode = <T extends CanvasShapes>() => {
    if (nodesIsEmpty()) return null;
    return nodes[0] as T;
  };

  const getLastNode = <T extends CanvasShapes>() => {
    if (nodesIsEmpty()) return null;
    return nodes[nodes.length - 1] as T;
  };

  return {
    setNodes,
    addNode,
    updateNode,
    removeNode,
    setSelectedNodeId,
    clearSelectedNode,
    getNode,
    getSelectedNode,
    getFirstNode,
    getLastNode,
    getActiveNode,
    setActiveNodeId,
    clearActiveNode,
    activeNodeId,
    selectedNodeId,
    nodes,
  };
};
