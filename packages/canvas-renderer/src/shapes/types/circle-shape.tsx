import { ICanvasPoint } from '@common/canvas-point';
import SVGContainer from '@components/svg/svg-container';
import { ShapeUtils } from '@shapes/shape-utils';
import {
  ICanvasCircleShape,
  ICanvasMouseEvenetsUpdatePayload,
  ICanvasBounds,
  ICanvasShapeDimensions,
} from '@shapes/types';
import getStroke from 'perfect-freehand';
import { Shape } from './shape';

export class CircleShape extends Shape<ICanvasCircleShape> {
  render(data: ICanvasCircleShape): JSX.Element {
    const { props, customization } = data;
    const { radius } = props;

    const strokeWidth = ShapeUtils.getShapeMappedSize(customization.size);

    const random = ShapeUtils.createSeededRandom(data.id);

    const segments = 28 + Math.floor(random() * 6);
    const center = { x: radius, y: radius };
    const mappedRadius = radius - strokeWidth;

    const points: ICanvasPoint[] = Array.from({ length: segments }).map((v, index) => {
      const angle = (Math.PI * 2 * index) / segments;
      const x = center.x + mappedRadius * Math.cos(angle) + random() * 3.5;
      const y = center.y + mappedRadius * Math.sin(angle) + random() * 3.5;

      return {
        x,
        y,
      };
    });

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
      <SVGContainer id={data.id}>
        <path d={path} strokeLinejoin="round" strokeLinecap="round" pointerEvents="all" fill={customization.color} />
      </SVGContainer>
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
}
