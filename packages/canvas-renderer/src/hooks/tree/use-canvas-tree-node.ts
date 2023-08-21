import { useCanvasCore } from '@hooks/core/use-canvas-core';
import { CanvasState } from '@state/canvas-core.slice';
import { CanvasTreeNode } from '@state/canvas-tree.slice';
import { useCanvasTree } from './use-canvas-tree';
import { ShapeUtils } from '@utils/shape-utils';
import { useMemo } from 'react';
import { ICanvasBounds, ICanvasShapeDimensions } from '@shapes/types';
import { ToolUtils } from '@utils/tool-utils';
import { CommonUtils } from '@utils/common-utils';

interface UseCanvasTreeNodeInterface {
  onPointerEnter: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerLeave: (event: React.PointerEvent<HTMLDivElement>) => void;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  nodeStyles: React.CSSProperties;
  bounds: ICanvasBounds;
  dimensions: ICanvasShapeDimensions;
  nodeChildren: React.JSX.Element;
}

export const useCanvasTreeNode = (node: CanvasTreeNode): UseCanvasTreeNodeInterface => {
  const { setCurrentState, currentState, selectedToolType } = useCanvasCore();
  const { setSelectedNodeId, setActiveNodeId, clearActiveNode, clearSelectedNode, updateNode, removeNode } =
    useCanvasTree();

  const shapeClass = ShapeUtils.getShapeClass(node.type);

  const dimensions = useMemo(() => {
    return shapeClass.calculateDimensions(node);
  }, [node]);

  const bounds = useMemo(() => {
    return shapeClass.calculateBounds(node);
  }, [node]);

  const onPointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!ToolUtils.isUtilityTool(selectedToolType)) return;

    setCurrentState(CanvasState.Hovering);
    setActiveNodeId(node.id);
  };

  const onPointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!ToolUtils.isUtilityTool(selectedToolType)) return;

    if (currentState === CanvasState.Editing) return;

    setCurrentState(CanvasState.Idling);
    clearActiveNode();
  };

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ToolUtils.isUtilityTool(selectedToolType)) return;

    if (selectedToolType === 'select') {
      // Select node
      setCurrentState(CanvasState.Editing);
      clearActiveNode();
      setSelectedNodeId(node.id);
    } else if (selectedToolType === 'eraser') {
      // Delete node
      setCurrentState(CanvasState.Idling);
      removeNode(node.id);
      clearActiveNode();
      clearSelectedNode();
    }
  };

  const calculateTransform = () => {
    const transform = `translate(${bounds.min.x - CommonUtils.SHAPE_PADDING}px,
    ${bounds.min.y - CommonUtils.SHAPE_PADDING}px)`;

    return transform;
  };

  const nodeStyles = useMemo(() => {
    const styles: React.CSSProperties = {
      width: `${dimensions.width + 2 * CommonUtils.SHAPE_PADDING}px`,
      height: `${dimensions.height + 2 * CommonUtils.SHAPE_PADDING}px`,
      transform: calculateTransform(),
      pointerEvents: 'all',
      transformOrigin: 'center center',
    };

    return styles;
  }, [node]);

  const nodeChildren = useMemo(() => {
    return shapeClass.render(node);
  }, [node]);

  return {
    onPointerEnter,
    onPointerLeave,
    onClick,
    nodeStyles,
    bounds,
    dimensions,
    nodeChildren,
  };
};
