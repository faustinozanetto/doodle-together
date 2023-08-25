import React, { memo } from 'react';
import { ShapeUtils } from '@utils/shape-utils';
import { CanvasTreeNode } from '@state/canvas-tree.slice';

import CanvasNodeSVGContainer from '@components/canvas/node/canvas-node-svg-container';
import { useCanvasTreeNodeStyles } from '@hooks/tree/node/use-canvas-node-styles';
import { useCanvasTreeNodeEvents } from '@hooks/tree/node/use-canvas-node-events';

type CanvasNodeProps = {
  node: CanvasTreeNode;
};

export const CanvasNode: React.FC<CanvasNodeProps> = memo(
  (props) => {
    const { node } = props;

    const { nodeStyles, nodeClassNames } = useCanvasTreeNodeStyles(node);
    const { events } = useCanvasTreeNodeEvents(node);
    const shapeClass = ShapeUtils.getShapeClass(node.type);

    return (
      <div className={nodeClassNames} style={nodeStyles} {...events}>
        <span className="absolute top-2 left-2">{node.id}</span>
        <CanvasNodeSVGContainer id={node.id}>{shapeClass.render(node)}</CanvasNodeSVGContainer>
      </div>
    );
  },
  (prev, next) => {
    return !ShapeUtils.getShapeClass(prev.node.type).shouldRender(prev.node, next.node);
  }
);
