import React, { memo } from 'react';
import clsx from 'clsx';
import { ShapeUtils } from '@utils/shape-utils';
import { CanvasTreeNode } from '@state/canvas-tree.slice';
import { useCanvasTreeNode } from '@hooks/tree/use-canvas-tree-node';
import { useCanvasTree } from '@hooks/tree/use-canvas-tree';
import { useCanvasCore } from '@hooks/core/use-canvas-core';

type CanvasNodeProps = {
  node: CanvasTreeNode;
};

export const CanvasNode: React.FC<CanvasNodeProps> = memo(
  (props) => {
    const { node } = props;

    const { selectedNodeId, activeNodeId } = useCanvasTree();
    const { selectedToolType } = useCanvasCore();
    const { onPointerEnter, onPointerLeave, onClick, nodeStyles, nodeChildren } = useCanvasTreeNode(node);

    return (
      <div
        className={clsx(
          'absolute inset-0 border-2',
          activeNodeId === node.id && 'border-red-500',
          selectedNodeId === node.id && 'border-blue-500',
          selectedToolType === 'select' && 'hover:cursor-pointer'
        )}
        style={nodeStyles}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onClick={onClick}
      >
        {nodeChildren}
      </div>
    );
  },
  (prev, next) => {
    return !ShapeUtils.getShapeClass(prev.node.type).shouldRender(prev.node, next.node);
  }
);
