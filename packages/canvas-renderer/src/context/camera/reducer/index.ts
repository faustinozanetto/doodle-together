import { CameraContextState, CameraActions, CameraActionType } from '../types';

export const reducer = (state: CameraContextState, action: CameraActions): CameraContextState => {
  switch (action.type) {
    case CameraActionType.SET_POSITION: {
      return {
        ...state,
        position: action.payload.position,
      };
    }
    case CameraActionType.SET_ZOOM: {
      return {
        ...state,
        zoom: action.payload.zoom,
      };
    }

    default:
      throw new Error('The action you requested does not exists!');
  }
};
