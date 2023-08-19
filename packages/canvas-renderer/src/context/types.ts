import { ElementRef } from 'react';
import { ActionMap } from '../common/types';
import { CanvasShapeTypes, CanvasShapes, ICanvasBounds } from '../shapes';

export type CanvasNode = CanvasShapes;

export type CanvasContextState = {
  nodes: CanvasNode[];
  bounds: ICanvasBounds;
  selectedNodeId: string;
  canvasRef: ElementRef<'div'> | null;
};

export type CanvasContextData = {
  state: CanvasContextState;
  dispatch: React.Dispatch<CanvasActions>;
};

export enum CanvasActionType {
  ADD_NODE,
  REMOVE_NODE,
  UPDATE_NODE,
  SELECT_NODE,
  DESELECT_NODE,
  SET_BOUNDS,
  SET_CANVAS_REF,
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
  [CanvasActionType.SELECT_NODE]: {
    id: string;
  };
  [CanvasActionType.DESELECT_NODE]: {};
  [CanvasActionType.SET_BOUNDS]: {
    bounds: ICanvasBounds;
  };
  [CanvasActionType.SET_CANVAS_REF]: {
    ref: ElementRef<'div'>;
  };
};

export type CanvasActions = ActionMap<CanvasPayload>[keyof ActionMap<CanvasPayload>];
