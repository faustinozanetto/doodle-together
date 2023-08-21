import React, { memo } from 'react';
import clsx from 'clsx';
import { ShapeUtils } from '@utils/shape-utils';
import { CanvasTreeNode } from '@state/canvas-tree.slice';
import { useCanvasTreeNode } from '@hooks/tree/use-canvas-tree-node';
import { useCanvasTree } from '@hooks/tree/use-canvas-tree';
import { useCanvasCore } from '@hooks/core/use-canvas-core';

import { ICanvasShapeDimensions } from '@shapes/types';
import CanvasNodeSVGContainer from '@components/canvas/node/canvas-node-svg-container';
import { CommonUtils } from '@utils/common-utils';

type CanvasNodeProps = {
  node: CanvasTreeNode;
};

export const CanvasNode: React.FC<CanvasNodeProps> = memo(
  (props) => {
    const { node } = props;

    const { selectedNodeId, activeNodeId } = useCanvasTree();
    const { selectedToolType } = useCanvasCore();
    const { onPointerEnter, onPointerLeave, onClick, dimensions, nodeStyles, nodeChildren } = useCanvasTreeNode(node);

    const dimensionsWithPadding: ICanvasShapeDimensions = {
      width: dimensions.width + CommonUtils.SHAPE_PADDING * 2,
      height: dimensions.height + CommonUtils.SHAPE_PADDING * 2,
    };

    return (
      <div
        className={clsx(
          'absolute inset-0',
          activeNodeId === node.id && 'border-red-500',
          selectedNodeId === node.id && 'border-blue-500',
          selectedToolType === 'select' && 'hover:cursor-pointer'
        )}
        style={nodeStyles}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onClick={onClick}
      >
        <CanvasNodeSVGContainer
          id={node.id}
          isActiveNode={activeNodeId === node.id}
          isSelectedNode={selectedNodeId === node.id}
          dimensions={dimensionsWithPadding}
        >
          {nodeChildren}
        </CanvasNodeSVGContainer>
      </div>
    );
  },
  (prev, next) => {
    return !ShapeUtils.getShapeClass(prev.node.type).shouldRender(prev.node, next.node);
  }
);
