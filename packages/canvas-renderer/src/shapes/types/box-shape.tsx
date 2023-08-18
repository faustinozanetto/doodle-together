import { Shape } from './shape';
import getStroke from 'perfect-freehand';
import { CanvasPoint, ICanvasBoxShape } from '../types';
import { ShapeUtils } from '../shape-utils';

export class BoxShape extends Shape<ICanvasBoxShape> {
  render(data: ICanvasBoxShape): JSX.Element {
    const { props, customization } = data;

    const strokeWidth = ShapeUtils.getShapeMappedSize(customization.size);

    const width = props.bottomRight.x - props.leftTop.x;
    const heigth = props.bottomRight.y - props.leftTop.y;

    // Corners
    const topLeft = { x: strokeWidth / 2, y: strokeWidth / 2 };
    const topRight = { x: width - strokeWidth / 2, y: strokeWidth / 2 };
    const bottomRight = { x: width - strokeWidth / 2, y: heigth - strokeWidth / 2 };
    const bottomLeft = { x: strokeWidth / 2, y: heigth - strokeWidth / 2 };

    // Points between corners
    const topBottomPoints = Math.max(8, Math.floor(width / 10));
    const leftRightPoints = Math.max(8, Math.floor(heigth / 10));

    const sides: CanvasPoint[][] = [
      ShapeUtils.getPointsInBetween(topLeft, topRight, topBottomPoints), // Top Side
      ShapeUtils.getPointsInBetween(topRight, bottomRight, leftRightPoints), // Right Side
      ShapeUtils.getPointsInBetween(bottomRight, bottomLeft, topBottomPoints), // Bottom Side
      ShapeUtils.getPointsInBetween(bottomLeft, topLeft, leftRightPoints), // Left Side
    ];

    const closedPathPoints: CanvasPoint[] = [...sides.flat(), ...sides[0]].slice(5, topBottomPoints / -2 + 3);

    const stroke = getStroke(closedPathPoints, {
      size: ShapeUtils.getShapeMappedSize(customization.size),
      simulatePressure: false,
      thinning: 0.85,
      end: { taper: 6.5 * 10 },
      start: { taper: 8.5 * 10 },
    });

    const path = ShapeUtils.getShapePathFromStroke(stroke);

    return <path d={path} />;
  }

  shouldRender(prev: ICanvasBoxShape, next: ICanvasBoxShape): boolean {
    return true;
  }
}
