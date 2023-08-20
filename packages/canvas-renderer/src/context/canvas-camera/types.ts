import { ICanvasPoint } from '@common/canvas-point';
import { ActionMap } from '@common/types';

export type CanvasCameraContextState = {
  position: ICanvasPoint;
  zoom: number;
};

export type CanvasCameraContextData = {
  state: CanvasCameraContextState;
  dispatch: React.Dispatch<CanvasCameraActions>;
};

export enum CanvasCameraActionType {
  SET_POSITION = 0,
  SET_ZOOM,
}

export type CanvasCameraPayload = {
  [CanvasCameraActionType.SET_POSITION]: {
    position: ICanvasPoint;
  };
  [CanvasCameraActionType.SET_ZOOM]: {
    zoom: number;
  };
};

export type CanvasCameraActions = ActionMap<CanvasCameraPayload>[keyof ActionMap<CanvasCameraPayload>];
