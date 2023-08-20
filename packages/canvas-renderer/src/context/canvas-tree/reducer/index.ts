import { ShapesFactory } from '@shapes/shapes-factory';
import { CanvasTreeContextState, CanvasTreeActions, CanvasTreeActionType, CanvasTreeNode } from '../types';

export const canvasTreeReducer = (state: CanvasTreeContextState, action: CanvasTreeActions): CanvasTreeContextState => {
  switch (action.type) {
    case CanvasTreeActionType.ADD_NODE: {
      const node = ShapesFactory.createShape(action.payload.type);

      return {
        ...state,
        nodes: [...state.nodes, node],
      };
    }
    case CanvasTreeActionType.UPDATE_NODE: {
      const updatedNodes: CanvasTreeNode[] = state.nodes.map((node) => {
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
    case CanvasTreeActionType.REMOVE_NODE: {
      const updatedNodes: CanvasTreeNode[] = state.nodes.filter((node) => node.id !== action.payload.id);

      return {
        ...state,
        nodes: updatedNodes,
      };
    }
    case CanvasTreeActionType.SELECT_NODE: {
      return {
        ...state,
        selectedNodeId: action.payload.id,
      };
    }
    case CanvasTreeActionType.DESELECT_NODE: {
      return {
        ...state,
        selectedNodeId: '',
      };
    }

    default:
      throw new Error('The action you requested does not exists!');
  }
};
