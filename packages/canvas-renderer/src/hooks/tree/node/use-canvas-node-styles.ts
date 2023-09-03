import { CanvasTreeNode } from '@state/canvas-tree.slice';
import { useCanvasTree } from '../use-canvas-tree';
import { useMemo } from 'react';
import { ShapeUtils } from '@utils/shape-utils';
import { CommonUtils } from '@utils/common-utils';
import clsx from 'clsx';
import { useCanvasCoreStore } from '@state/canvas-core.slice';

type UseCanvasTreeNodeStylesReturn = {
  nodeStyles: React.CSSProperties;
  nodeClassNames: string;
};

/**
 * Hook responsible for managing styles of a canvas node.
 * @param node Node data.
 * @returns Node styles and classnames.
 */
export const useCanvasTreeNodeStyles = (node: CanvasTreeNode): UseCanvasTreeNodeStylesReturn => {
  const { currentState } = useCanvasCoreStore();
  const { activeNodeId, selectedNodeId } = useCanvasTree();

  const shapeClass = ShapeUtils.getShapeClass(node.type);

  const dimensions = useMemo(() => {
    return shapeClass.calculateDimensions(node);
  }, [node]);

  const bounds = useMemo(() => {
    return shapeClass.calculateBounds(node);
  }, [node]);

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
      'absolute inset-0 rounded-lg select-none',
      isActiveNode && 'border-blue-500 border-2',
      isSelectedNode && 'border-red-500 border-2'
    );
  }, [selectedNodeId, activeNodeId, node]);

  return { nodeStyles, nodeClassNames };
};
