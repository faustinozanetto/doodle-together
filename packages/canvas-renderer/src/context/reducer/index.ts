import { CanvasContextState, CanvasActions, CanvasActionType, CanvasNode } from '../types';
import { ShapesFactory } from '../../shapes';

export const reducer = (state: CanvasContextState, action: CanvasActions): CanvasContextState => {
  switch (action.type) {
    case CanvasActionType.ADD_NODE: {
      const node = ShapesFactory.createShape(action.payload.type);

      return {
        ...state,
        nodes: [...state.nodes, node],
      };
    }
    case CanvasActionType.UPDATE_NODE: {
      const updatedNodes: CanvasNode[] = state.nodes.map((node) => {
        if (node.id === action.payload.id) {
          return {
            ...action.payload.data,
          };
        }
        return { ...node };
      });

      return {
        ...state,
        nodes: updatedNodes,
      };
    }
    case CanvasActionType.REMOVE_NODE: {
      const updatedNodes: CanvasNode[] = state.nodes.filter((node) => node.id !== action.payload.id);

      return {
        ...state,
        nodes: updatedNodes,
      };
    }
    default:
      throw new Error('The action you requested does not exists!');
  }
};
