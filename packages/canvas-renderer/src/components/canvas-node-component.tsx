import React, { useEffect } from 'react';
import { CanvasShapes, ShapeUtils } from '../shapes';

type CanvasNodeComponentProps = {
  node: CanvasShapes;
};

export const CanvasNodeComponent: React.FC<CanvasNodeComponentProps> = (props) => {
  const { node } = props;

  const transform = `matrix(1, 0, 0, 1, ${node.position.x}px, ${node.position.y}px)`;

  useEffect(() => {
    console.log('Node updated!');
  }, [node]);

  return (
    <g id={node.id} transform={transform}>
      {ShapeUtils.getShapeClass(node.type).render(node)}
    </g>
  );
};
