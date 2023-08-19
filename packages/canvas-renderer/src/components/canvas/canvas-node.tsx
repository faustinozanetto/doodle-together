import React, { memo } from 'react';
import { ShapeUtils } from '../../shapes';
import { type CanvasNode as CanvasNodeData } from '../../context/canvas/types';

type CanvasNodeProps = {
  node: CanvasNodeData;
};

export const CanvasNode: React.FC<CanvasNodeProps> = memo(
  (props) => {
    const { node } = props;

    const shapeClass = ShapeUtils.getShapeClass(node.type);

    // const dimensions = shapeClass.calculateDimensions(node);
    const bounds = shapeClass.calculateBounds(node);
    const dimensions = ShapeUtils.getBoundsDimensions(bounds);

    const padding = '24px';
    const transform = `translate(calc(${bounds.min.x}px - ${padding}),
    calc(${bounds.min.y}px - ${padding}))`;

    return (
      <div
        className="absolute top-0 left-0 border-2 flex items-center justify-center overflow-clip hover:border-red-500"
        style={{
          width: `calc(${dimensions.width}px + 2 * ${padding})`,
          height: `calc(${dimensions.height}px  + 2* ${padding})`,
          transform,
          transformOrigin: 'center center',
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
