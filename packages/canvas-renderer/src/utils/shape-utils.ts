import { ICanvasPoint } from '@common/canvas-point';
import {
  CanvasShapeToolTypes,
  CanvasShapes,
  ICanvasShapeCustomization,
  ICanvasBounds,
  ICanvasShapeDimensions,
} from '../shapes/types';
import { BoxShape } from '../shapes/types/box-shape';
import { CircleShape } from '../shapes/types/circle-shape';
import { DrawShape } from '../shapes/types/draw-shape';
import { Shape } from '../shapes/types/shape';
import { getStrokePoints } from 'perfect-freehand';
import { CanvasTreeNode } from '@state/canvas-tree.slice';
import { DiamondShape } from '@shapes/types/diamond-shape';
import { HexagonShape } from '@shapes/types/hexagon-shape';
import { TriangleShape } from '@shapes/types/triangle-shape';

const SHAPE_CLASSES: Record<CanvasShapeToolTypes, Shape<CanvasShapes>> = {
  box: new BoxShape(),
  draw: new DrawShape(),
  circle: new CircleShape(),
  diamond: new DiamondShape(),
  hexagon: new HexagonShape(),
  triangle: new TriangleShape(),
};

const SHAPE_SIZES: Record<ICanvasShapeCustomization['size'], number> = {
  small: 6,
  medium: 10,
  large: 12,
  'extra-large': 16,
};

export class ShapeUtils {
  static getShapeBaseCustomization(): ICanvasShapeCustomization {
    return {
      color: '#000',
      size: 'medium',
      style: 'drawn',
    };
  }

  static serializeShapes(shapes: CanvasTreeNode[]) {
    const serialized = shapes
      .map((shape, index) => {
        return JSON.stringify(shape);
      })
      .join(',');
    const encoder = new TextEncoder();
    const encoded = encoder.encode(serialized);

    const decoder = new TextDecoder();
    const decoded = decoder.decode(encoded);
    console.log({ encoded: encoded.toString() });
    console.log({ decoded });
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
    if (stroke.length === 0) return '';

    const average = (a: number, b: number) => (a + b) / 2;

    const first = stroke[0];
    let result = `M${first[0].toFixed(2)},${first[1].toFixed(2)}Q`;

    for (let i = 0, max = stroke.length - 1; i < max; i++) {
      const current = stroke[i];
      const next = stroke[i + 1];
      result += `${current[0].toFixed(2)},${current[1].toFixed(2)} ${average(current[0], next[0]).toFixed(2)},${average(
        current[1],
        next[1]
      ).toFixed(2)} `;
    }

    return `${result}Z`;
  }

  static getShapePathFromPoints(points: ICanvasPoint[]) {
    const pointsLength = points.length;

    if (pointsLength === 0) return 'M 0 0 L 0 0';
    if (pointsLength < 3) return `M ${points[0].x} ${points[0].y}`;

    const strokePoints = getStrokePoints(points).map((pt) => pt.point);

    const strokePointsLength = strokePoints.length;

    const path = strokePoints.reduce(
      (acc, [x0, y0], i, arr) => {
        if (i === strokePointsLength - 1) {
          acc.push('L', +x0.toFixed(2), +y0.toFixed(2));
          return acc;
        }

        const [x1, y1] = arr[i + 1];
        const xAvg = ((x0 + x1) / 2).toFixed(2);
        const yAvg = ((y0 + y1) / 2).toFixed(2);

        acc.push(x0.toFixed(2), y0.toFixed(2), xAvg, yAvg);

        return acc;
      },
      ['M', strokePoints[0][0], strokePoints[0][1], 'Q']
    );

    return path.join(' ');
  }
}
