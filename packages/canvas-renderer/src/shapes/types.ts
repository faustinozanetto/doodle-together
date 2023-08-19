export type CanvasPoint = {
  x: number;
  y: number;
};

export enum CanvasShapeTypes {
  Draw = 'Draw',
  Box = 'Box',
  Circle = 'Circle',
}

export type CanvasShapeSize = 'small' | 'medium' | 'large' | 'extra-large';

export type CanvasShapeStyle = 'solid' | 'dashed' | 'dotted';

export interface ICanvasBounds {
  min: CanvasPoint;
  max: CanvasPoint;
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
  position: CanvasPoint;
  rotation: number;
}

export interface ICanvasShape extends ICanvasBaseShape {
  type: CanvasShapeTypes;
  customization: ICanvasShapeCustomization;
}

export interface ICanvasDrawShape extends ICanvasShape {
  props: {
    points: CanvasPoint[];
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
