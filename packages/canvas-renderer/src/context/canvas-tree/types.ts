import { ActionMap } from '@common/types';
import { CanvasShapes, CanvasShapeTypes } from '@shapes/types';

export type CanvasTreeNode = CanvasShapes;

export type CanvasTreeContextState = {
  nodes: CanvasTreeNode[];
  selectedNodeId: string;
};

export type CanvasTreeContextData = {
  state: CanvasTreeContextState;
  dispatch: React.Dispatch<CanvasTreeActions>;
};

export enum CanvasTreeActionType {
  ADD_NODE = 0,
  REMOVE_NODE,
  UPDATE_NODE,
  SELECT_NODE,
  DESELECT_NODE,
}

export type CanvasTreePayload = {
  [CanvasTreeActionType.ADD_NODE]: {
    type: CanvasShapeTypes;
  };
  [CanvasTreeActionType.REMOVE_NODE]: {
    id: string;
  };
  [CanvasTreeActionType.UPDATE_NODE]: {
    id: string;
    data: CanvasShapes;
  };
  [CanvasTreeActionType.SELECT_NODE]: {
    id: string;
  };
  [CanvasTreeActionType.DESELECT_NODE]: {};
};

export type CanvasTreeActions = ActionMap<CanvasTreePayload>[keyof ActionMap<CanvasTreePayload>];
