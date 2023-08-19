import { Shape } from './shape';
import getStroke from 'perfect-freehand';
import {
  CanvasPoint,
  ICanvasBounds,
  ICanvasBoxShape,
  ICanvasMouseEvenetsUpdatePayload,
  ICanvasShapeDimensions,
} from '../types';
import { ShapeUtils } from '../shape-utils';
import SVGContainer from '../../components/svg-container';

export class BoxShape extends Shape<ICanvasBoxShape> {
  render(data: ICanvasBoxShape): JSX.Element {
    const { props, customization } = data;

    const { size } = props;

    const strokeWidth = ShapeUtils.getShapeMappedSize(customization.size);

    const width = Math.max(0, size.width - strokeWidth / 2);
    const heigth = Math.max(0, size.height - strokeWidth / 2);

    // Corners
    const corners = {
      topLeft: { x: strokeWidth / 2, y: strokeWidth / 2 },
      topRight: { x: width, y: strokeWidth / 2 },
      bottomRight: { x: width, y: heigth },
      bottomLeft: { x: strokeWidth / 2, y: heigth },
    };

    // Points between corners
    const topBottomPoints = Math.max(8, Math.floor(width / 12));
    const leftRightPoints = Math.max(8, Math.floor(heigth / 12));

    const sides: CanvasPoint[][] = [
      ShapeUtils.getPointsInBetween(corners.topLeft, corners.topRight, topBottomPoints), // Top Side
      ShapeUtils.getPointsInBetween(corners.topRight, corners.bottomRight, leftRightPoints), // Right Side
      ShapeUtils.getPointsInBetween(corners.bottomRight, corners.bottomLeft, topBottomPoints), // Bottom Side
      ShapeUtils.getPointsInBetween(corners.bottomLeft, corners.topLeft, leftRightPoints), // Left Side
    ];

    const closedPathPoints: CanvasPoint[] = [...sides.flat(), ...sides[0], ...sides[1]].slice(
      4,
      Math.floor(topBottomPoints / -2) + 2
    );

    const stroke = getStroke(closedPathPoints, {
      size: ShapeUtils.getShapeMappedSize(customization.size),
      thinning: 0.55,
      simulatePressure: false,
      smoothing: 0.65,
      streamline: 0.75,
      end: { taper: strokeWidth * 2.5 },
      start: { taper: strokeWidth * 2.5 },
      last: true,
    });

    const path = ShapeUtils.getShapePathFromStroke(stroke);

    return (
      <SVGContainer id={data.id}>
        <path d={path} />
      </SVGContainer>
    );
  }

  mouseUpdate(data: ICanvasBoxShape, updatePayload: ICanvasMouseEvenetsUpdatePayload): ICanvasBoxShape {
    const { cursorPoint, originPoint } = updatePayload;

    const width = Math.abs(cursorPoint.x - originPoint.x);
    const height = Math.abs(cursorPoint.y - originPoint.y);

    let finalPoint: CanvasPoint = originPoint;

    if (originPoint.x < cursorPoint.x && originPoint.y > cursorPoint.y) {
      finalPoint = {
        x: originPoint.x,
        y: cursorPoint.y,
      };
    } else if (originPoint.x > cursorPoint.x && originPoint.y > cursorPoint.y) {
      finalPoint = {
        x: cursorPoint.x,
        y: cursorPoint.y,
      };
    } else if (originPoint.x > cursorPoint.x && originPoint.y < cursorPoint.y) {
      finalPoint = {
        x: cursorPoint.x,
        y: originPoint.y,
      };
    } else if (originPoint.x < cursorPoint.x && originPoint.y < cursorPoint.y) {
    }

    const updatedData: ICanvasBoxShape = {
      ...data,
      position: finalPoint,
      props: {
        ...data.props,
        size: {
          width,
          height,
        },
      },
    };

    return updatedData;
  }

  shouldRender(prev: ICanvasBoxShape, next: ICanvasBoxShape): boolean {
    return prev.position !== next.position || prev.props.size !== next.props.size;
  }

  calculateBounds(data: ICanvasBoxShape): ICanvasBounds {
    const { props, position } = data;
    const { size } = props;

    const bounds: ICanvasBounds = { min: { x: 0, y: 0 }, max: { x: size.width, y: size.height } };

    const translatedBounds: ICanvasBounds = {
      min: {
        x: bounds.min.x + position.x,
        y: bounds.min.y + position.y,
      },
      max: {
        x: bounds.max.x + position.x,
        y: bounds.max.y + position.y,
      },
    };

    return translatedBounds;
  }

  calculateDimensions(data: ICanvasBoxShape): ICanvasShapeDimensions {
    const { props } = data;
    const { size } = props;

    return { width: size.width, height: size.height };
  }
}
