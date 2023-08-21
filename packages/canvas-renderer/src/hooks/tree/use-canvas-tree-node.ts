import { useCanvasCore } from '@hooks/core/use-canvas-core';
import { CanvasState } from '@state/canvas-core.slice';
import { CanvasTreeNode } from '@state/canvas-tree.slice';
import { useCanvasTree } from './use-canvas-tree';
import { ShapeUtils } from '@utils/shape-utils';
import { useMemo } from 'react';
import { ICanvasBounds, ICanvasShapeDimensions } from '@shapes/types';
import { ToolUtils } from '@utils/tool-utils';

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

  const PADDING = '24px';

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
    const transform = `translate(calc(${bounds.min.x}px - ${PADDING}),
    calc(${bounds.min.y}px - ${PADDING}))`;

    return transform;
  };

  const nodeStyles = useMemo(() => {
    const styles: React.CSSProperties = {
      width: `calc(${dimensions.width}px + 2 * ${PADDING})`,
      height: `calc(${dimensions.height}px  + 2 * ${PADDING})`,
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
