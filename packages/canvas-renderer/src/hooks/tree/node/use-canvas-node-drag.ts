import { useCanvasCore } from '@hooks/core/use-canvas-core';
import { CanvasTreeNode } from '@state/canvas-tree.slice';
import { useRef } from 'react';
import { CanvasPoint, ICanvasPoint } from '@common/canvas-point';
import { useCanvasTree } from '../use-canvas-tree';
import { CommonUtils } from '@utils/common-utils';
import { useCanvasCamera } from '@hooks/camera/use-canvas-camera';

export const useCanvasTreeNodeDrag = (node: CanvasTreeNode) => {
  const { bounds } = useCanvasCore();
  const { updateNode } = useCanvasTree();
  const camera = useCanvasCamera();

  const prevPoint = useRef<ICanvasPoint>({ x: 0, y: 0 });
  const originPoint = useRef<ICanvasPoint>({ x: 0, y: 0 });
  const isMouseDown = useRef<boolean>(false);

  const onDragPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isMouseDown || !originPoint.current) return;

    const point = CommonUtils.getTransformedEventPoint(event, bounds, camera);

    const delta = CanvasPoint.sub(point, originPoint.current);
    const trueDelta = CanvasPoint.sub(delta, prevPoint.current);

    prevPoint.current = delta;

    const newPosition: ICanvasPoint = CanvasPoint.add(node.position, trueDelta);
    updateNode(node.id, {
      ...node,
      position: newPosition,
    });
  };

  const onDragPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    isMouseDown.current = false;
    originPoint.current = { x: 0, y: 0 };
    prevPoint.current = { x: 0, y: 0 };
  };

  const onDragPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const point = CommonUtils.getPoint(event, bounds);

    isMouseDown.current = true;
    originPoint.current = point;
  };

  return {
    onDragPointerDown,
    onDragPointerMove,
    onDragPointerUp,
  };
};
