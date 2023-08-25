import { CanvasPoint, ICanvasPoint } from '@common/canvas-point';
import { useCanvasCamera } from '@hooks/camera/use-canvas-camera';
import { useMouseDrag } from '@hooks/common/use-mouse-drag';

type UseCanvasDragReturn = {
  onDragPointerUp: (event: React.PointerEvent) => void;
  onDragPointerDown: (event: React.PointerEvent) => void;
  onDragPointerMove: (event: React.PointerEvent) => void;
};

/**
 * Hook responsible for canvas drag interaction with mouse.
 * @returns Pointer events.
 */
export const useCanvasDrag = (): UseCanvasDragReturn => {
  const { setPosition, position, zoom } = useCanvasCamera();

  const { events } = useMouseDrag({
    useCameraTransformation: false,
    callbacks: {
      onPointerDownCallback(event) {},
      onPointerUpCallback(event) {},
      onPointerMoveCallback(delta) {
        // Calculate new camera position and use zoom to maintain speed.
        const newPosition: ICanvasPoint = CanvasPoint.add(position, CanvasPoint.div(delta, zoom));
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
