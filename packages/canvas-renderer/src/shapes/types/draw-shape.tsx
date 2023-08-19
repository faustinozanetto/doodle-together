import { Shape } from './shape';

import getStroke from 'perfect-freehand';
import { ICanvasBounds, ICanvasDrawShape } from '../types';
import { ShapeUtils } from '../shape-utils';

export class DrawShape extends Shape<ICanvasDrawShape> {
  render(data: ICanvasDrawShape): JSX.Element {
    const { props, customization } = data;

    const stroke = getStroke(props.points, {
      size: ShapeUtils.getShapeMappedSize(customization.size),
      thinning: 0.5,
      smoothing: 0.5,
      streamline: 0.5,
      end: { taper: 6.5 * 10 },
      start: { taper: 8.5 * 10 },
    });

    const path = ShapeUtils.getShapePathFromStroke(stroke);

    return <path d={path} />;
  }

  shouldRender(prev: ICanvasDrawShape, next: ICanvasDrawShape): boolean {
    const should = prev.props.points !== next.props.points;

    return true;
  }

  calculateBounds(data: ICanvasDrawShape): ICanvasBounds {
    throw new Error('Method not implemented.');
  }
}
