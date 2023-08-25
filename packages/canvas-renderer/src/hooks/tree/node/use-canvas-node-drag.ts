import { CanvasTreeNode } from '@state/canvas-tree.slice';
import { CanvasPoint, ICanvasPoint } from '@common/canvas-point';
import { useCanvasTree } from '../use-canvas-tree';
import { useMouseDrag } from '@hooks/common/use-mouse-drag';

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
          ...node,
          position: newPosition,
        });
      },
    },
  });

  return events;
};
