import { ICanvasPoint } from '../common/canvas-point';

export enum CanvasShapeTypes {
  Draw = 'Draw',
  Box = 'Box',
  Circle = 'Circle',
}

export type CanvasShapeSize = 'small' | 'medium' | 'large' | 'extra-large';

export type CanvasShapeStyle = 'solid' | 'dashed' | 'dotted';

export interface ICanvasBounds {
  min: ICanvasPoint;
  max: ICanvasPoint;
}

export interface ICanvasMouseEvenetsUpdatePayload {
  cursorPoint: ICanvasPoint;
  originPoint: ICanvasPoint;
  topLeftPoint: ICanvasPoint;
  points: ICanvasPoint[];
  translatedPoints: ICanvasPoint[];
}

export interface ICanvasShapeDimensions {
  width: number;
  height: number;
}

export interface ICanvasShapeCustomization {
  color: string;
  size: CanvasShapeSize;
  style: CanvasShapeStyle;
}

export interface ICanvasBaseShape {
  id: string;
  position: ICanvasPoint;
  rotation: number;
}

export interface ICanvasShape extends ICanvasBaseShape {
  type: CanvasShapeTypes;
  customization: ICanvasShapeCustomization;
}

export interface ICanvasDrawShape extends ICanvasShape {
  props: {
    points: ICanvasPoint[];
  };
}

export interface ICanvasBoxShape extends ICanvasShape {
  props: {
    size: ICanvasShapeDimensions;
  };
}

export interface ICanvasCircleShape extends ICanvasShape {
  props: {
    radius: number;
  };
}

export type CanvasShapes = ICanvasDrawShape | ICanvasBoxShape | ICanvasCircleShape;
