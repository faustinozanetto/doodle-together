import { ICanvasPoint } from '@common/canvas-point';
import {
  CanvasShapeToolTypes,
  CanvasShapes,
  ICanvasShapeCustomization,
  ICanvasBounds,
  ICanvasShapeDimensions,
} from './types';
import { BoxShape } from './types/box-shape';
import { CircleShape } from './types/circle-shape';
import { DrawShape } from './types/draw-shape';
import { Shape } from './types/shape';
import { CanvasCameraSliceState } from '@state/canvas-camera.slice';

const SHAPE_CLASSES: Record<CanvasShapeToolTypes, Shape<CanvasShapes>> = {
  box: new BoxShape(),
  draw: new DrawShape(),
  circle: new CircleShape(),
};

const SHAPE_SIZES: Record<ICanvasShapeCustomization['size'], number> = {
  small: 8,
  medium: 12,
  large: 14,
  'extra-large': 18,
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

  static getShapeClass(shapeType: CanvasShapeToolTypes): Shape<CanvasShapes> {
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

  static getCameraTransformedPoint(point: ICanvasPoint, camera: CanvasCameraSliceState): ICanvasPoint {
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

  private static hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) & 0xffffffff;
    }
    return hash;
  }

  private static getNextSeedRandomValue(state: { s0: number; s1: number; s2: number; c: number }): number {
    const { s0, s1, s2, c } = state;
    const t = (s0 + s1 + s2) >>> 0;
    state.s0 = s1;
    state.s1 = s2;
    state.s2 = t;

    return ((t >>> 0) / 0x100000000) % 1;
  }

  static createSeededRandom(id: string) {
    const state = {
      s0: this.hashString(id),
      s1: this.hashString(id),
      s2: this.hashString(id),
      c: 1,
    };

    return () => this.getNextSeedRandomValue(state);
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
