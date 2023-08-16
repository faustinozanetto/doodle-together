import React from 'react';
import { ICanvasShape, ShapeUtils } from '../shapes';

type CanvasNodeComponentProps = {
  node: ICanvasShape;
};

export const CanvasNodeComponent: React.FC<CanvasNodeComponentProps> = (props) => {
  const { node } = props;
  const { id, type } = node;

  const shapeClass = ShapeUtils.getShapeTypeClass(type);
  const transform = `matrix(1, 0, 0, 1, 400, 300)`;

  return (
    <g id={id} className="" transform={transform}>
      {shapeClass.render(node)}
    </g>
  );
};
