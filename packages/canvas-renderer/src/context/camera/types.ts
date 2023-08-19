import { ICanvasPoint } from '../../common/canvas-point';
import { ActionMap } from '../../common/types';

export type CameraContextState = {
  position: ICanvasPoint;
  zoom: number;
};

export type CameraContextData = {
  state: CameraContextState;
  dispatch: React.Dispatch<CameraActions>;
};

export enum CameraActionType {
  SET_POSITION,
  SET_ZOOM,
}

export type CameraPayload = {
  [CameraActionType.SET_POSITION]: {
    position: ICanvasPoint;
  };
  [CameraActionType.SET_ZOOM]: {
    zoom: number;
  };
};

export type CameraActions = ActionMap<CameraPayload>[keyof ActionMap<CameraPayload>];
