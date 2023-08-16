import { DrawShape } from './draw-shape';
import { Shape } from './shape';
import { CanvasShapeTypes, CanvasShapes } from './types';

export const SHAPES_CLASSES: Record<CanvasShapeTypes, Shape<CanvasShapes>> = {
  [CanvasShapeTypes.Draw]: new DrawShape(),
  [CanvasShapeTypes.Box]: new DrawShape(),
  [CanvasShapeTypes.Circle]: new DrawShape(),
};

export class ShapesFactory {
  static createDrawShape() {
    return new DrawShape();
  }
}
