import { ActionMap } from '@common/types';
import { ICanvasShapeCustomization } from '@shapes/types';

export type CanvasCustomizationContextState = {
  customization: ICanvasShapeCustomization;
};

export type CanvasCustomizationContextData = {
  state: CanvasCustomizationContextState;
  dispatch: React.Dispatch<CanvasCustomizationActions>;
};

export enum CanvasCustomizationActionType {
  SET_COLOR = 0,
  SET_SIZE,
  SET_STYLE,
}

export type CanvasCustomizationPayload = {
  [CanvasCustomizationActionType.SET_COLOR]: {
    color: ICanvasShapeCustomization['color'];
  };
  [CanvasCustomizationActionType.SET_SIZE]: {
    size: ICanvasShapeCustomization['size'];
  };
  [CanvasCustomizationActionType.SET_STYLE]: {
    style: ICanvasShapeCustomization['style'];
  };
};

export type CanvasCustomizationActions =
  ActionMap<CanvasCustomizationPayload>[keyof ActionMap<CanvasCustomizationPayload>];
