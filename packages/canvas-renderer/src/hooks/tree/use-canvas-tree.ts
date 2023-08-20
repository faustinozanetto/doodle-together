import { CanvasShapeTypes, CanvasShapes } from '@shapes/types';
import { useCanvasTreeContext } from './use-canvas-tree-context';
import { CanvasTreeActionType } from '@context/canvas-tree/types';

export const useCanvasTree = () => {
  const { state, dispatch } = useCanvasTreeContext();

  const nodesIsEmpty = () => {
    return state.nodes.length === 0;
  };

  const getNodes = (): CanvasShapes[] => {
    return state.nodes;
  };

  const getNode = <T extends CanvasShapes>(id: string): CanvasShapes | null => {
    const node = state.nodes.find((node) => node.id === id);
    if (!node) return null;
    return node as T;
  };

  const getSelectedNode = <T extends CanvasShapes>() => {
    return getNode<T>(state.selectedNodeId);
  };

  const getFirstNode = <T extends CanvasShapes>() => {
    if (nodesIsEmpty()) return null;
    return state.nodes[0] as T;
  };

  const getLastNode = <T extends CanvasShapes>() => {
    if (nodesIsEmpty()) return null;
    return state.nodes[state.nodes.length - 1] as T;
  };

  const setSelectedNode = (id: string) => {
    dispatch({ type: CanvasTreeActionType.SELECT_NODE, payload: { id } });
  };

  const clearSelectedNode = () => {
    dispatch({ type: CanvasTreeActionType.DESELECT_NODE, payload: {} });
  };

  const addNode = (type: CanvasShapeTypes) => {
    dispatch({ type: CanvasTreeActionType.ADD_NODE, payload: { type } });
  };

  const updateNode = <T extends CanvasShapes>(id: string, data: T) => {
    dispatch({ type: CanvasTreeActionType.UPDATE_NODE, payload: { id, data } });
  };

  const removeNode = (id: string) => {
    dispatch({ type: CanvasTreeActionType.REMOVE_NODE, payload: { id } });
  };

  return {
    addNode,
    updateNode,
    removeNode,
    setSelectedNode,
    clearSelectedNode,
    getNode,
    getNodes,
    getSelectedNode,
    getFirstNode,
    getLastNode,
  };
};
