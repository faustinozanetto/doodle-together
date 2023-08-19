import { ShapesFactory } from '../../../shapes';
import { CanvasContextState, CanvasActions, CanvasActionType, CanvasNode } from '../types';

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
    case CanvasActionType.SELECT_NODE: {
      return {
        ...state,
        selectedNodeId: action.payload.id,
      };
    }
    case CanvasActionType.DESELECT_NODE: {
      return {
        ...state,
        selectedNodeId: '',
      };
    }
    case CanvasActionType.SET_BOUNDS: {
      return {
        ...state,
        bounds: action.payload.bounds,
      };
    }
    case CanvasActionType.SET_CANVAS_REF: {
      return {
        ...state,
        canvasRef: action.payload.ref,
      };
    }
    default:
      throw new Error('The action you requested does not exists!');
  }
};
