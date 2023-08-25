import { CanvasPoint, ICanvasPoint } from '@common/canvas-point';
import { useCanvasCamera } from '@hooks/camera/use-canvas-camera';
import { useMouseDrag } from '@hooks/common/use-mouse-drag';

export const useCanvasDrag = () => {
  const { setPosition, position } = useCanvasCamera();

  const { events } = useMouseDrag({
    useCameraTransformation: false,
    callbacks: {
      onPointerDownCallback(event) {},
      onPointerUpCallback(event) {},
      onPointerMoveCallback(delta) {
        const newPosition: ICanvasPoint = CanvasPoint.add(position, delta);
        setPosition(newPosition);
      },
    },
  });

  return {
    onDragPointerUp: events.onPointerUp,
    onDragPointerDown: events.onPointerDown,
    onDragPointerMove: events.onPointerMove,
  };
};
