import { nanoid } from 'nanoid';
import { Shape } from './shape';
import { CanvasShapeTypes, ICanvasDrawShape } from './types';
import { ShapeUtils } from './shape-utils';
import getStroke from 'perfect-freehand';

export class DrawShape extends Shape<ICanvasDrawShape> {
  render(data: ICanvasDrawShape): JSX.Element {
    const { points, customization } = data;

    const stroke = getStroke(points, {
      size: 14,
      thinning: 0.5,
      smoothing: 0.5,
      streamline: 0.5,
      end: { taper: 6.5 * 10 },
      start: { taper: 8.5 * 10 },
    });

    console.log('render', data.id, data.points.length);

    const path = ShapeUtils.getShapePathFromStroke(stroke);

    return <path d={path} />;
  }

  shouldRender(prev: ICanvasDrawShape, next: ICanvasDrawShape): boolean {
    const should = prev.points !== next.points;
    console.log({ should });
    return true;
  }
}
