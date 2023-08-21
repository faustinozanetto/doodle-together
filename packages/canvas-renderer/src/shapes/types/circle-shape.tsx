import { ICanvasPoint } from '@common/canvas-point';
import { ShapeUtils } from '@utils/shape-utils';
import {
  ICanvasCircleShape,
  ICanvasMouseEvenetsUpdatePayload,
  ICanvasBounds,
  ICanvasShapeDimensions,
} from '@shapes/types';
import getStroke from 'perfect-freehand';
import { Shape } from './shape';
import { CommonUtils } from '@utils/common-utils';

export class CircleShape extends Shape<ICanvasCircleShape> {
  renderHandDrawn(data: ICanvasCircleShape): JSX.Element {
    const { customization } = data;

    const points = this.calculateCirclePoints(data);
    const mappedPoints = [...points, ...points.slice(0, 3)];

    const stroke = getStroke(mappedPoints, {
      size: ShapeUtils.getShapeMappedSize(customization.size),
      thinning: 0.45,
      simulatePressure: false,
      smoothing: 0.85,
      streamline: 0,
    });

    const path = ShapeUtils.getShapePathFromStroke(stroke);

    return (
      <path d={path} strokeLinejoin="round" strokeLinecap="round" pointerEvents="all" fill={customization.color} />
    );
  }

  renderDashed(data: ICanvasCircleShape): JSX.Element {
    const { customization } = data;

    const points = this.calculateCirclePoints(data);
    const mappedPoints = [...points, points[0]];
    const path = ShapeUtils.getShapePathFromPoints(mappedPoints);

    const strokeWidth = ShapeUtils.getShapeMappedSize(customization.size);
    const strokeDashArray = `${strokeWidth * 2.25} ${strokeWidth * 2.5}`;
    const strokeDashOffset = `${strokeWidth}`;

    return (
      <path
        d={path}
        fill="none"
        stroke={customization.color}
        strokeWidth={strokeWidth * 1.25}
        strokeDasharray={strokeDashArray}
        strokeDashoffset={strokeDashOffset}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    );
  }

  renderDotted(data: ICanvasCircleShape): JSX.Element {
    const { customization } = data;

    const points = this.calculateCirclePoints(data);
    const mappedPoints = [...points, points[0]];

    const path = ShapeUtils.getShapePathFromPoints(mappedPoints);

    const strokeWidth = ShapeUtils.getShapeMappedSize(customization.size);
    const strokeDashArray = `${strokeWidth / 8} ${strokeWidth * 2.5}`;
    const strokeDashOffset = `${strokeWidth / 10}`;

    return (
      <path
        d={path}
        fill="none"
        stroke={customization.color}
        strokeWidth={strokeWidth * 1.5}
        strokeDasharray={strokeDashArray}
        strokeDashoffset={strokeDashOffset}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    );
  }

  mouseUpdate(data: ICanvasCircleShape, updatePayload: ICanvasMouseEvenetsUpdatePayload): ICanvasCircleShape {
    const { originPoint, cursorPoint } = updatePayload;

    const radius = Math.max(Math.abs(originPoint.x - cursorPoint.x), Math.abs(originPoint.y - cursorPoint.y));

    const updatedData: ICanvasCircleShape = {
      ...data,
      position: updatePayload.originPoint,
      props: { ...data.props, radius },
    };

    return updatedData;
  }

  shouldRender(prev: ICanvasCircleShape, next: ICanvasCircleShape): boolean {
    return (
      prev.position !== next.position ||
      prev.props.radius !== next.props.radius ||
      prev.customization !== next.customization
    );
  }

  calculateBounds(data: ICanvasCircleShape): ICanvasBounds {
    const { props, position } = data;
    const { radius } = props;

    const bounds: ICanvasBounds = {
      min: {
        x: position.x - radius,
        y: position.y - radius,
      },
      max: {
        x: position.x + radius,
        y: position.y + radius,
      },
    };

    return bounds;
  }

  calculateDimensions(data: ICanvasCircleShape): ICanvasShapeDimensions {
    const { props } = data;
    const { radius } = props;

    return { width: 2 * radius, height: 2 * radius };
  }

  private calculateCirclePoints(data: ICanvasCircleShape) {
    const { props } = data;
    const { radius } = props;

    const segments = 24 + Math.floor(radius / 100);
    const center = { x: radius, y: radius };

    const random = CommonUtils.createSeededRandom(data.id);
    const offsets: ICanvasPoint[] = Array.from({ length: segments }).map(() => {
      return {
        x: random() * 2.5,
        y: random() * 2.5,
      };
    });

    const points: ICanvasPoint[] = Array.from({ length: segments }).map((v, index) => {
      const angle = (index / segments) * 2 * Math.PI;
      const offset = offsets[index];

      const x = center.x + radius * Math.cos(angle) + offset.x;
      const y = center.y + radius * Math.sin(angle) + offset.y;
      return {
        x,
        y,
      };
    });

    return points;
  }
}
