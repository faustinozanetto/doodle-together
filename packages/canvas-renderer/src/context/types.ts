import { ActionMap, DeepPartial } from '../common/types';
import { CanvasShapeTypes, CanvasShapes } from '../shapes';

export type CanvasNode = CanvasShapes;

export type CanvasContextState = {
  nodes: CanvasNode[];
};

export type CanvasContextData = {
  state: CanvasContextState;
  dispatch: React.Dispatch<CanvasActions>;
};

export enum CanvasActionType {
  ADD_NODE,
  REMOVE_NODE,
  UPDATE_NODE,
}

export type CanvasPayload = {
  [CanvasActionType.ADD_NODE]: {
    type: CanvasShapeTypes;
  };
  [CanvasActionType.REMOVE_NODE]: {
    id: string;
  };
  [CanvasActionType.UPDATE_NODE]: {
    id: string;
    data: CanvasShapes;
  };
};

export type CanvasActions = ActionMap<CanvasPayload>[keyof ActionMap<CanvasPayload>];
