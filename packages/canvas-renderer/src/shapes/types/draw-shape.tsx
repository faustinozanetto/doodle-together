import SVGContainer from '@components/svg/svg-container';
import { ShapeUtils } from '@shapes/shape-utils';
import {
  ICanvasDrawShape,
  ICanvasMouseEvenetsUpdatePayload,
  ICanvasBounds,
  ICanvasShapeDimensions,
} from '@shapes/types';
import getStroke from 'perfect-freehand';
import { Shape } from './shape';

export class DrawShape extends Shape<ICanvasDrawShape> {
  render(data: ICanvasDrawShape): JSX.Element {
    const { props, customization } = data;

    const stroke = getStroke(props.points, {
      size: ShapeUtils.getShapeMappedSize(customization.size),
      thinning: 0.6,
      streamline: 0.85,
      smoothing: 0.5,
      end: { taper: 6.5 * 4 },
      start: { taper: 8.5 * 2.5 },
    });

    const path = ShapeUtils.getShapePathFromStroke(stroke);

    return (
      <SVGContainer id={data.id}>
        <path d={path} strokeLinejoin="round" strokeLinecap="round" pointerEvents="all" fill={customization.color} />
      </SVGContainer>
    );
  }

  mouseUpdate(data: ICanvasDrawShape, updatePayload: ICanvasMouseEvenetsUpdatePayload): ICanvasDrawShape {
    const { topLeftPoint, translatedPoints } = updatePayload;

    const updatedData: ICanvasDrawShape = {
      ...data,
      position: topLeftPoint,
      props: { ...data.props, points: translatedPoints },
    };

    return updatedData;
  }

  shouldRender(prev: ICanvasDrawShape, next: ICanvasDrawShape): boolean {
    return prev.customization !== next.customization || prev.props.points !== next.props.points;
  }

  calculateBounds(data: ICanvasDrawShape): ICanvasBounds {
    const { props, position } = data;
    const { points } = props;

    const bounds: ICanvasBounds = {
      min: { x: Infinity, y: Infinity },
      max: { x: -Infinity, y: -Infinity },
    };

    for (const point of points) {
      bounds.min.x = Math.min(bounds.min.x, point.x);
      bounds.min.y = Math.min(bounds.min.y, point.y);
      bounds.max.x = Math.max(bounds.max.x, point.x);
      bounds.max.y = Math.max(bounds.max.y, point.y);
    }

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

  calculateDimensions(data: ICanvasDrawShape): ICanvasShapeDimensions {
    const bounds = this.calculateBounds(data);

    const width = Math.max(1, bounds.max.x - bounds.min.x);
    const height = Math.max(1, bounds.max.y - bounds.min.y);

    return { width, height };
  }
}
