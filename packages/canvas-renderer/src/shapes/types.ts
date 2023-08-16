export enum CanvasShapeTypes {
  Draw = 'Draw',
  Box = 'Box',
  Circle = 'Circle',
}

export type CanvasShapeSize = 'small' | 'medium' | 'large' | 'extra-large';

export type CanvasShapeStyle = 'solid' | 'dashed' | 'dotted';

export interface ICanvasShapeCustomization {
  color: string;
  size: CanvasShapeSize;
  style: CanvasShapeStyle;
}

export interface ICanvasBaseShape {
  id: string;
  parentId: string | null;
  children: string[];
}

export interface ICanvasShape extends ICanvasBaseShape {
  type: CanvasShapeTypes;
  customization: ICanvasShapeCustomization;
}

export interface ICanvasDrawShape extends ICanvasShape {
  points: number[][];
}

export interface ICanvasBoxShape extends ICanvasShape {}

export type CanvasShapes = ICanvasDrawShape | ICanvasBoxShape;
