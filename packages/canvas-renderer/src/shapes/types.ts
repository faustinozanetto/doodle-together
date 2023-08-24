import { ICanvasPoint } from '@common/canvas-point';

export type CanvasShapeToolTypes = 'draw' | 'box' | 'circle';

export type CanvasUtilityToolTypes = 'select' | 'eraser' | 'clear';

export type CanvasToolTypes = CanvasShapeToolTypes | CanvasUtilityToolTypes;

export type CanvasShapeSize = 'small' | 'medium' | 'large' | 'extra-large';

export type CanvasShapeStyle = 'drawn' | 'dashed' | 'dotted';

export interface ICanvasBounds {
  min: ICanvasPoint;
  max: ICanvasPoint;
}

export interface ICanvasEvenetsData {
  cursorPoint: ICanvasPoint;
  originPoint: ICanvasPoint | null;
  topLeftPoint: ICanvasPoint | null;
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

export interface ICanvasBackgroundCustomization {
  enableGrid: boolean;
  gridSize: number;
}

export interface ICanvasBaseShape {
  id: string;
  position: ICanvasPoint;
  rotation: number;
}

export interface ICanvasShape extends ICanvasBaseShape {
  type: CanvasShapeToolTypes;
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
