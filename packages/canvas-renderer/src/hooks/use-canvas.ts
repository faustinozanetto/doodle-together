import { CanvasActionType } from '../context/types';
import { CanvasShapeTypes, CanvasShapes } from '../shapes';
import { useCanvasContext } from './use-canvas-context';

export const useCanvas = () => {
  const { state, dispatch } = useCanvasContext();

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

  const getFirstNode = <T extends CanvasShapes>() => {
    if (nodesIsEmpty()) return null;
    return state.nodes[0] as T;
  };

  const getLastNode = <T extends CanvasShapes>() => {
    if (nodesIsEmpty()) return null;
    return state.nodes[state.nodes.length - 1] as T;
  };

  const addNode = (type: CanvasShapeTypes) => {
    dispatch({ type: CanvasActionType.ADD_NODE, payload: { type } });
  };

  const updateNode = <T extends CanvasShapes>(id: string, data: T) => {
    dispatch({ type: CanvasActionType.UPDATE_NODE, payload: { id, data } });
  };

  const removeNode = (id: string) => {
    dispatch({ type: CanvasActionType.REMOVE_NODE, payload: { id } });
  };

  return { addNode, updateNode, removeNode, getNode, getNodes, getFirstNode, getLastNode };
};
