import React, { memo, useMemo } from 'react';
import { CanvasNode as CanvasNodeData } from '../context/types';
import { ShapeUtils } from '../shapes';

type CanvasNodeProps = {
  node: CanvasNodeData;
};

export const CanvasNode: React.FC<CanvasNodeProps> = memo(
  (props) => {
    const { node } = props;

    const shapeClass = ShapeUtils.getShapeClass(node.type);

    const dimensions = shapeClass.calculateDimensions(node);

    const bounds = shapeClass.calculateBounds(node);

    // const position = shapeClass.calculateCenter(node);

    const transform = `translate(${bounds.min.x}px, ${bounds.min.y}px)`;

    return (
      <div
        className="absolute top-0 left-0 flex items-center justify-center"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          transformOrigin: 'center center',
          transform,
        }}
      >
        {shapeClass.render(node)}
      </div>
    );
  },
  (prev, next) => {
    return !ShapeUtils.getShapeClass(prev.node.type).shouldRender(prev.node, next.node);
  }
);
