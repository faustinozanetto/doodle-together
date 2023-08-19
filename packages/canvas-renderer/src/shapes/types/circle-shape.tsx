import { Shape } from './shape';

import getStroke from 'perfect-freehand';
import { CanvasPoint, ICanvasBounds, ICanvasCircleShape } from '../types';
import { ShapeUtils } from '../shape-utils';
import SVGContainer from '../../components/svg-container';

export class CircleShape extends Shape<ICanvasCircleShape> {
  render(data: ICanvasCircleShape): JSX.Element {
    const { props, customization, position } = data;
    const { radius } = props;

    const segments = 35;

    const points: CanvasPoint[] = Array.from({ length: segments }).map((v, index) => {
      const angle = (Math.PI * 2 * index) / segments;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      return {
        x,
        y,
      };
    });

    const stroke = getStroke(points, {
      size: ShapeUtils.getShapeMappedSize(customization.size),
      thinning: 0.5,
    });

    const path = ShapeUtils.getShapePathFromStroke(stroke);

    return (
      <SVGContainer id={data.id}>
        <path d={path} />
      </SVGContainer>
    );
  }

  shouldRender(prev: ICanvasCircleShape, next: ICanvasCircleShape): boolean {
    const should = prev.props.radius !== next.props.radius;

    return true;
  }

  calculateBounds(data: ICanvasCircleShape): ICanvasBounds {
    throw new Error('Method not implemented.');
  }
}
