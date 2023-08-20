import { ActionMap } from '@common/types';
import { ICanvasBounds, CanvasShapeTypes } from '@shapes/types';
import { ElementRef } from 'react';

export type CanvasCoreContextState = {
  bounds: ICanvasBounds;
  selectedShape: CanvasShapeTypes;
  canvasRef: ElementRef<'div'> | null;
};

export type CanvasCoreContextData = {
  state: CanvasCoreContextState;
  dispatch: React.Dispatch<CanvasCoreActions>;
};

export enum CanvasCoreActionType {
  SET_BOUNDS = 0,
  SET_CANVAS_REF,
  SET_SELECTED_SHAPE,
}

export type CanvasCorePayload = {
  [CanvasCoreActionType.SET_BOUNDS]: {
    bounds: ICanvasBounds;
  };
  [CanvasCoreActionType.SET_CANVAS_REF]: {
    canvasRef: ElementRef<'div'>;
  };
  [CanvasCoreActionType.SET_SELECTED_SHAPE]: {
    shape: CanvasShapeTypes;
  };
};

export type CanvasCoreActions = ActionMap<CanvasCorePayload>[keyof ActionMap<CanvasCorePayload>];
