import { nanoid } from 'nanoid';
import { Shape } from './shape';
import { CanvasShapeTypes, ICanvasDrawShape } from './types';
import { ShapeUtils } from './shape-utils';
import getStroke from 'perfect-freehand';

export class DrawShape extends Shape<ICanvasDrawShape> {
  protected data: ICanvasDrawShape;

  constructor() {
    super();

    const shapeId = nanoid();

    this.data = {
      id: shapeId,
      children: [],
      parentId: null,
      type: CanvasShapeTypes.Draw,
      points: [
        [0, 0, 0.5],
        [250, 150, 0.65],
        [500, 0, 0.65],
      ],
      customization: ShapeUtils.getShapeBaseCustomization(),
    };
  }

  render(shape: ICanvasDrawShape): JSX.Element {
    const { points } = shape;

    const stroke = getStroke(points, {
      size: 2.5,
      thinning: 0.75,
      end: { taper: 2.5 * 10 },
      start: { taper: 2.5 * 10 },
    });

    const path = ShapeUtils.getShapePathFromStroke(stroke);

    const dimensions: { width: number; height: number } = {
      height: 300,
      width: 450,
    };

    return (
      <div
        className="absolute overflow-visible"
        style={{
          transformOrigin: 'top left',
          transform: 'matrix(1, 0, 0, 1, 400, 300)',
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
        }}
      >
        <svg
          id="shape:9D8Av2dfZoaGQUCFE187m"
          className="absolute top-0 left-0 w-full h-full"
          style={{ transformOrigin: 'top left' }}
        >
          <path
            d={path}
            fill="#000"
            stroke="#000"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            pointerEvents="all"
          />
        </svg>
      </div>
    );
  }

  shouldRender(prev: ICanvasDrawShape, next: ICanvasDrawShape): boolean {
    return prev.points !== next.points;
  }
}
