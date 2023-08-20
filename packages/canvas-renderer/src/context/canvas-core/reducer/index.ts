import { CanvasCoreContextState, CanvasCoreActions, CanvasCoreActionType } from '../types';

export const canvasCoreReducer = (state: CanvasCoreContextState, action: CanvasCoreActions): CanvasCoreContextState => {
  switch (action.type) {
    case CanvasCoreActionType.SET_BOUNDS: {
      return {
        ...state,
        bounds: action.payload.bounds,
      };
    }
    case CanvasCoreActionType.SET_CANVAS_REF: {
      return {
        ...state,
        canvasRef: action.payload.canvasRef,
      };
    }
    case CanvasCoreActionType.SET_SELECTED_SHAPE: {
      return {
        ...state,
        selectedShape: action.payload.shape,
      };
    }
    default:
      throw new Error('The action you requested does not exists!');
  }
};
