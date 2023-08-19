import { Shape } from './types/shape';
import {
  CanvasShapeTypes,
  CanvasShapes,
  ICanvasBounds,
  ICanvasShapeCustomization,
  ICanvasShapeDimensions,
} from './types';
import { DrawShape } from './types/draw-shape';
import { BoxShape } from './types/box-shape';
import { CircleShape } from './types/circle-shape';
import { CameraContextState } from '../context/camera/types';
import { ICanvasPoint } from '../common/canvas-point';

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

  static getBoundsCenter(bounds: ICanvasBounds): ICanvasPoint {
    const centerX = (bounds.min.x + bounds.max.x) / 2;
    const centerY = (bounds.min.y + bounds.max.y) / 2;
    return { x: centerX, y: centerY };
  }

  static getBoundsDimensions(bounds: ICanvasBounds): ICanvasShapeDimensions {
    const { min, max } = bounds;
    const width = max.x - min.x;
    const height = max.y - min.y;
    return { width, height };
  }

  static getCameraTransformedPoint(point: ICanvasPoint, camera: CameraContextState): ICanvasPoint {
    const { zoom, position } = camera;
    const zoomMapped: ICanvasPoint = {
      x: point.x / zoom,
      y: point.y / zoom,
    };
    const translated: ICanvasPoint = {
      x: zoomMapped.x - position.x,
      y: zoomMapped.y - position.y,
    };
    return translated;
  }

  static random(id: string): number {
    let seed = 0;
    for (let i = 0; i < id.length; i++) {
      seed = (seed * 31 + id.charCodeAt(i)) % 1000000;
    }

    const seededRandom = (seed / 1000000 + Math.random()) % 1;
    return seededRandom;
  }

  static lerpCanvasPoints(start: ICanvasPoint, end: ICanvasPoint, t: number) {
    const lerpedX = start.x + t * (end.x - start.x);
    const lerpedY = start.y + t * (end.y - start.y);
    return { x: lerpedX, y: lerpedY };
  }

  static getPointsInBetween(start: ICanvasPoint, end: ICanvasPoint, amount: number = 4) {
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
