import { CanvasTreeNode } from '@state/canvas-tree.slice';
import { useCanvasTree } from '../use-canvas-tree';
import { useCanvasCore } from '@hooks/core/use-canvas-core';
import { CanvasState } from '@state/canvas-core.slice';
import { useMemo } from 'react';
import { ShapeUtils } from '@utils/shape-utils';
import { CommonUtils } from '@utils/common-utils';
import clsx from 'clsx';

export const useCanvasTreeNodeStyles = (node: CanvasTreeNode) => {
  const { currentState } = useCanvasCore();
  const { activeNodeId, selectedNodeId } = useCanvasTree();

  const shapeClass = ShapeUtils.getShapeClass(node.type);

  const CURSOR_STYLES: Record<CanvasState, React.CSSProperties['cursor']> = {
    Dragging: 'grabbing',
    Drawing: 'cell',
    Editing: 'pointer',
    Hovering: 'pointer',
    Idling: 'default',
  };

  const dimensions = useMemo(() => {
    return shapeClass.calculateDimensions(node);
  }, [node]);

  const bounds = useMemo(() => {
    return shapeClass.calculateBounds(node);
  }, [node]);

  const getNodeCursorStyles = () => {
    return CURSOR_STYLES[currentState] ?? 'default';
  };

  const getNodeDimensionsStyles = () => {
    return {
      width: `${dimensions.width + 2 * CommonUtils.SHAPE_PADDING}px`,
      height: `${dimensions.height + 2 * CommonUtils.SHAPE_PADDING}px`,
    };
  };

  const getNodeTransformStyles = () => {
    const transform = `translate(${bounds.min.x - CommonUtils.SHAPE_PADDING}px,
      ${bounds.min.y - CommonUtils.SHAPE_PADDING}px)`;

    return { transform };
  };

  const nodeStyles = useMemo(() => {
    const styles: React.CSSProperties = {
      transformOrigin: 'center center',
      cursor: getNodeCursorStyles(),
      pointerEvents: 'all',
      ...getNodeDimensionsStyles(),
      ...getNodeTransformStyles(),
    };

    return styles;
  }, [node, currentState, activeNodeId, selectedNodeId]);

  const nodeClassNames = useMemo(() => {
    const isActiveNode = activeNodeId === node.id;
    const isSelectedNode = selectedNodeId === node.id;

    return clsx(
      'absolute inset-0 border-2 rounded-lg select-none',
      isActiveNode && 'border-blue-500',
      isSelectedNode && 'border-red-500'
    );
  }, [selectedNodeId, activeNodeId, node]);

  return { nodeStyles, nodeClassNames };
};
