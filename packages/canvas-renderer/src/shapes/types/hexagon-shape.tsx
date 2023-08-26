import { CanvasPoint, ICanvasPoint } from '@common/canvas-point';
import { ShapeUtils } from '@utils/shape-utils';
import { ICanvasHexagonShape, ICanvasBounds, ICanvasShapeDimensions } from '@shapes/types';
import getStroke from 'perfect-freehand';
import { Shape } from './shape';
import { CommonUtils } from '@utils/common-utils';
import { PointerMoveData } from '@hooks/canvas/use-canvas-draw';

export class HexagonShape extends Shape<ICanvasHexagonShape> {
  renderHandDrawn(data: ICanvasHexagonShape): JSX.Element {
    const { customization } = data;

    const points = this.calculateHexagonPoints(data);

    const closedPathPoints: ICanvasPoint[] = [...points.flat().slice(4), ...points[0].slice(0, 12)];

    const strokeWidth = ShapeUtils.getShapeMappedSize(customization.size);

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
      <path d={path} strokeLinejoin="round" strokeLinecap="round" fill={customization.color} pointerEvents="none" />
    );
  }

  renderDashed(data: ICanvasHexagonShape): JSX.Element {
    const { customization } = data;

    const points = this.calculateHexagonPoints(data);

    const path = ShapeUtils.getShapePathFromPoints(points.flat());

    const strokeWidth = ShapeUtils.getShapeMappedSize(customization.size);
    const strokeDashArray = `${strokeWidth * 2.25} ${strokeWidth * 2.5}`;
    const strokeDashOffset = `${strokeWidth}`;

    return (
      <path
        d={path}
        fill="none"
        pointerEvents="none"
        stroke={customization.color}
        strokeWidth={strokeWidth * 1.25}
        strokeDasharray={strokeDashArray}
        strokeDashoffset={strokeDashOffset}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    );
  }

  renderDotted(data: ICanvasHexagonShape): JSX.Element {
    const { customization } = data;

    const points = this.calculateHexagonPoints(data);

    const path = ShapeUtils.getShapePathFromPoints(points.flat());

    const strokeWidth = ShapeUtils.getShapeMappedSize(customization.size);
    const strokeDashArray = `${strokeWidth / 8} ${strokeWidth * 2.5}`;
    const strokeDashOffset = `${strokeWidth / 10}`;

    return (
      <path
        d={path}
        fill="none"
        pointerEvents="none"
        stroke={customization.color}
        strokeWidth={strokeWidth * 1.5}
        strokeDasharray={strokeDashArray}
        strokeDashoffset={strokeDashOffset}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    );
  }

  mouseUpdate(data: ICanvasHexagonShape, updatePayload: PointerMoveData): ICanvasHexagonShape {
    const { cursorPoint, originPoint } = updatePayload;

    if (!originPoint) return data;

    const width = Math.abs(cursorPoint.x - originPoint.x);
    const height = Math.abs(cursorPoint.y - originPoint.y);

    let finalPoint: ICanvasPoint = originPoint;

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

    const updatedData: ICanvasHexagonShape = {
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

  shouldRender(prev: ICanvasHexagonShape, next: ICanvasHexagonShape): boolean {
    return (
      prev.position !== next.position ||
      prev.props.size !== next.props.size ||
      prev.customization !== next.customization
    );
  }

  calculateBounds(data: ICanvasHexagonShape): ICanvasBounds {
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

  calculateDimensions(data: ICanvasHexagonShape): ICanvasShapeDimensions {
    const { props } = data;
    const { size } = props;

    return { width: size.width, height: size.height };
  }

  private calculateHexagonPoints(data: ICanvasHexagonShape) {
    const { props, customization } = data;
    const { size } = props;

    const strokeWidth = ShapeUtils.getShapeMappedSize(customization.size);

    const width = Math.max(0, size.width - strokeWidth / 2);
    const heigth = Math.max(0, size.height - strokeWidth / 2);

    const random = CommonUtils.createSeededRandom(data.id);
    const cornerOffsets: ICanvasPoint[] = Array.from({ length: 6 }).map(() => {
      return {
        x: (random() * strokeWidth - 4) / 2,
        y: (random() * strokeWidth - 3.5) / 2,
      };
    });

    const heightSteps = Array.from({ length: 5 }).map((_, i) => i / 4);

    // Corners
    const corners = {
      topLeft: CanvasPoint.add({ x: strokeWidth / 2, y: heigth * heightSteps[1] }, cornerOffsets[0]),
      topMiddle: CanvasPoint.add({ x: width / 2, y: strokeWidth / 2 }, cornerOffsets[1]),
      topRight: CanvasPoint.add({ x: width, y: heigth * heightSteps[1] }, cornerOffsets[2]),
      bottomLeft: CanvasPoint.add({ x: strokeWidth / 2, y: heigth * heightSteps[3] }, cornerOffsets[3]),
      bottomMiddle: CanvasPoint.add({ x: width / 2, y: heigth }, cornerOffsets[4]),
      bottomRight: CanvasPoint.add({ x: width, y: heigth * heightSteps[3] }, cornerOffsets[5]),
    };

    // Points between corners
    const pointsInBetween = Math.max(14, Math.floor(width / 20));

    const points: ICanvasPoint[][] = [
      ShapeUtils.getPointsInBetween(corners.topLeft, corners.topMiddle, pointsInBetween),
      ShapeUtils.getPointsInBetween(corners.topMiddle, corners.topRight, pointsInBetween),
      ShapeUtils.getPointsInBetween(corners.topRight, corners.bottomRight, pointsInBetween),
      ShapeUtils.getPointsInBetween(corners.bottomRight, corners.bottomMiddle, pointsInBetween),
      ShapeUtils.getPointsInBetween(corners.bottomMiddle, corners.bottomLeft, pointsInBetween),
      ShapeUtils.getPointsInBetween(corners.bottomLeft, corners.topLeft, pointsInBetween),
    ];

    return points;
  }
}
