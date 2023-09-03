import { CanvasTreeNode } from '@state/canvas-tree.slice';
import { CanvasPoint, ICanvasPoint } from '@common/canvas-point';
import { useCanvasTree } from '../use-canvas-tree';
import { UserMouseDragReturn, useMouseDrag } from '@hooks/common/use-mouse-drag';

/**
 * Hook responsible for canvas node drag interaction with mouse.
 * @param node Node data.
 * @returns Pointer events.
 */
export const useCanvasTreeNodeDrag = (node: CanvasTreeNode) => {
  const { updateNode } = useCanvasTree();

  const { events } = useMouseDrag({
    useCameraTransformation: true,
    callbacks: {
      onPointerDownCallback(event) {},
      onPointerUpCallback(event) {},
      onPointerMoveCallback(delta) {
        const newPosition: ICanvasPoint = CanvasPoint.add(node.position, delta);
        updateNode(node.id, {
          position: newPosition,
        });
      },
    },
  });

  return events;
};
