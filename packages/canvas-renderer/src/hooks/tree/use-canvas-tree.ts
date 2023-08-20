import { CanvasShapes } from '@shapes/types';
import { useCanvasTreeStore } from '@state/canvas-tree.slice';

export const useCanvasTree = () => {
  const { addNode, deselectNode, removeNode, selectNode, updateNode, nodes, selectedNodeId } = useCanvasTreeStore();

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

  const getFirstNode = <T extends CanvasShapes>() => {
    if (nodesIsEmpty()) return null;
    return nodes[0] as T;
  };

  const getLastNode = <T extends CanvasShapes>() => {
    if (nodesIsEmpty()) return null;
    return nodes[nodes.length - 1] as T;
  };

  return {
    addNode,
    updateNode,
    removeNode,
    selectNode,
    deselectNode,
    getNode,
    getSelectedNode,
    getFirstNode,
    getLastNode,
    nodes,
  };
};
