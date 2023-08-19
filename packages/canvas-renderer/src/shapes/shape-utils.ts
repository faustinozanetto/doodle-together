import { Shape } from './types/shape';
import { CanvasPoint, CanvasShapeTypes, CanvasShapes, ICanvasShapeCustomization } from './types';
import { DrawShape } from './types/draw-shape';
import { BoxShape } from './types/box-shape';
import { CircleShape } from './types/circle-shape';

const SHAPE_CLASSES: Record<CanvasShapeTypes, Shape<CanvasShapes>> = {
  Box: new BoxShape(),
  Draw: new DrawShape(),
  Circle: new CircleShape(),
};

const SHAPE_SIZES: Record<ICanvasShapeCustomization['size'], number> = {
  small: 6,
  medium: 8,
  large: 10,
  'extra-large': 14,
};

export class ShapeUtils {
  static getShapeBaseCustomization(): ICanvasShapeCustomization {
    return {
      color: '#000',
      size: 'medium',
      style: 'solid',
    };
  }

  static getShapeMappedSize(size: ICanvasShapeCustomization['size']): number {
    return SHAPE_SIZES[size];
  }

  static getShapeClass(shapeType: CanvasShapeTypes): Shape<CanvasShapes> {
    return SHAPE_CLASSES[shapeType];
  }

  static lerpCanvasPoints(start: CanvasPoint, end: CanvasPoint, t: number) {
    const lerpedX = start.x + t * (end.x - start.x);
    const lerpedY = start.y + t * (end.y - start.y);
    return { x: lerpedX, y: lerpedY };
  }

  static getPointsInBetween(start: CanvasPoint, end: CanvasPoint, amount: number = 4) {
    return Array.from({ length: amount }, (_, index) => {
      const t = index / (amount - 1);
      return this.lerpCanvasPoints(start, end, t);
    });
  }

  static getShapePathFromStroke(stroke: number[][]): string {
    if (!stroke.length) return '';

    const average = (a: number, b: number) => (a + b) / 2;

    const first = stroke[0];
    let result = `M${first[0].toFixed(3)},${first[1].toFixed(3)}Q`;

    for (let i = 0, max = stroke.length - 1; i < max; i++) {
      const a = stroke[i];
      const b = stroke[i + 1];
      result += `${a[0].toFixed(3)},${a[1].toFixed(3)} ${average(a[0], b[0]).toFixed(3)},${average(a[1], b[1]).toFixed(
        3
      )} `;
    }

    result += 'Z';

    return result;
  }
}
