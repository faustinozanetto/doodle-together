import { CanvasCustomizationContextState, CanvasCustomizationActions, CanvasCustomizationActionType } from '../types';

export const canvasCustomizationReducer = (
  state: CanvasCustomizationContextState,
  action: CanvasCustomizationActions
): CanvasCustomizationContextState => {
  switch (action.type) {
    case CanvasCustomizationActionType.SET_COLOR: {
      return {
        ...state,
        customization: {
          ...state.customization,
          color: action.payload.color,
        },
      };
    }
    case CanvasCustomizationActionType.SET_SIZE: {
      return {
        ...state,
        customization: {
          ...state.customization,
          size: action.payload.size,
        },
      };
    }
    case CanvasCustomizationActionType.SET_STYLE: {
      return {
        ...state,
        customization: {
          ...state.customization,
          style: action.payload.style,
        },
      };
    }
    default:
      throw new Error('The action you requested does not exists!');
  }
};
