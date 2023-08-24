import { ShapeUtils } from '@utils/shape-utils';
import { ICanvasDrawShape, ICanvasEvenetsData, ICanvasBounds, ICanvasShapeDimensions } from '@shapes/types';
import getStroke from 'perfect-freehand';
import { Shape } from './shape';
import { JSX } from 'react';

export class DrawShape extends Shape<ICanvasDrawShape> {
  renderHandDrawn(data: ICanvasDrawShape): JSX.Element {
    const { props, customization } = data;

    const strokeWidth = ShapeUtils.getShapeMappedSize(customization.size);

    const stroke = getStroke(props.points, {
      size: strokeWidth,
      thinning: 0.6,
      streamline: 0.85,
      smoothing: 0.5,
      end: { taper: 6.5 * 4 },
      start: { taper: 8.5 * 2.5 },
      last: true,
    });

    const path = ShapeUtils.getShapePathFromStroke(stroke);

    return (
      <path
        d={path}
        strokeLinejoin="round"
        strokeLinecap="round"
        pointerEvents="none"
        strokeWidth={strokeWidth}
        fill={customization.color}
      />
    );
  }

  renderDashed(data: ICanvasDrawShape): JSX.Element {
    const { props, customization } = data;

    const path = ShapeUtils.getShapePathFromPoints(props.points);

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

  renderDotted(data: ICanvasDrawShape): JSX.Element {
    const { props, customization } = data;

    const path = ShapeUtils.getShapePathFromPoints(props.points);

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
        pointerEvents="none"
      />
    );
  }

  mouseUpdate(data: ICanvasDrawShape, updatePayload: ICanvasEvenetsData): ICanvasDrawShape {
    const { topLeftPoint, translatedPoints } = updatePayload;

    if (!topLeftPoint) return data;

    const updatedData: ICanvasDrawShape = {
      ...data,
      position: topLeftPoint,
      props: { ...data.props, points: translatedPoints },
    };

    return updatedData;
  }

  shouldRender(prev: ICanvasDrawShape, next: ICanvasDrawShape): boolean {
    return (
      prev.customization !== next.customization ||
      prev.props.points !== next.props.points ||
      prev.position !== next.position
    );
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
