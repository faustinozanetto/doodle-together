import { CanvasShapes } from '@shapes/types';
import { useCanvasCoreStore } from '@state/canvas-core.slice';
import { useCanvasTreeStore } from '@state/canvas-tree.slice';

/**
 * Hook responsible for providing functions to edit canvas tree.
 * @returns
 */
export const useCanvasTree = () => {
  const { setNodes, clerNodes, addNode, removeNode, updateNode, nodes } = useCanvasTreeStore();

  const { selectedNodeId, activeNodeId, setActiveNodeId, clearActiveNode, setSelectedNodeId, clearSelectedNode } =
    useCanvasCoreStore();

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
    clerNodes,
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
