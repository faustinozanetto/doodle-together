import React, { memo } from 'react';
import { CanvasNode as CanvasNodeData } from '../context/types';
import { ShapeUtils } from '../shapes';

type CanvasNodeProps = {
  node: CanvasNodeData;
};

export const CanvasNode: React.FC<CanvasNodeProps> = memo(
  (props) => {
    const { node } = props;

    const transform = `matrix(1, 0, 0, 1, ${node.position.x}px, ${node.position.y}px)`;

    return (
      <g id={node.id} transform={transform}>
        {ShapeUtils.getShapeClass(node.type).render(node)}
      </g>
    );
  },
  (prev, next) => {
    return !ShapeUtils.getShapeClass(prev.node.type).shouldRender(prev.node, next.node);
  }
);
