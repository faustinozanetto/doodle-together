import { CanvasCameraContextState, CanvasCameraActions, CanvasCameraActionType } from '../types';

export const canvasCameraReducer = (
  state: CanvasCameraContextState,
  action: CanvasCameraActions
): CanvasCameraContextState => {
  switch (action.type) {
    case CanvasCameraActionType.SET_POSITION: {
      return {
        ...state,
        position: action.payload.position,
      };
    }
    case CanvasCameraActionType.SET_ZOOM: {
      return {
        ...state,
        zoom: action.payload.zoom,
      };
    }

    default:
      throw new Error('The action you requested does not exists!');
  }
};
