import { Shape } from './shape';
import { CanvasShapeTypes, CanvasShapes, ICanvasShapeCustomization } from './types';
import { SHAPES_CLASSES } from './shapes-factory';

const average = (a: number, b: number) => (a + b) / 2;

export class ShapeUtils {
  static getShapeBaseCustomization(): ICanvasShapeCustomization {
    return {
      color: '#000',
      size: 'medium',
      style: 'solid',
    };
  }

  static getShapeTypeClass(shapeType: CanvasShapeTypes): Shape<CanvasShapes> {
    return SHAPES_CLASSES[shapeType];
  }

  static getShapePathFromStroke(stroke: number[][]): string {
    if (!stroke.length) return '';

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
