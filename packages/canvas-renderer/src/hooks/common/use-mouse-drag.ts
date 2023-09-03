import { ICanvasPoint, CanvasPoint } from '@common/canvas-point';
import { useCanvasCamera } from '@hooks/camera/use-canvas-camera';
import { useCanvasCoreStore } from '@state/canvas-core.slice';
import { CommonUtils } from '@utils/common-utils';
import { useCallback, useRef, useState } from 'react';

type UseMouseDragParams = {
  /** Wether if camera location and zoom should be used. */
  useCameraTransformation: boolean;
  callbacks: {
    /**
     * Callback function when pointer moves.
     * @param delta Delta point.
     */
    onPointerMoveCallback: (delta: ICanvasPoint) => void;
    /**
     * Callback function when pointer up.
     * @param event Event.
     */
    onPointerUpCallback: (event: React.PointerEvent) => void;
    /**
     * Callback function when pointer down.
     * @param event Event.
     */
    onPointerDownCallback: (event: React.PointerEvent) => void;
  };
};

export type UserMouseDragReturn = {
  events: {
    /**
     * Pointer move event
     * @param event Event
     */
    onPointerMove: (event: React.PointerEvent) => void;
    /**
     * Pointer up event
     * @param event Event
     */
    onPointerUp: (event: React.PointerEvent) => void;
    /**
     * Pointer down event
     * @param event Event
     */
    onPointerDown: (event: React.PointerEvent) => void;
  };
};

export const useMouseDrag = ({
  useCameraTransformation = true,
  callbacks,
}: UseMouseDragParams): UserMouseDragReturn => {
  const { onPointerDownCallback, onPointerMoveCallback, onPointerUpCallback } = callbacks;

  const { bounds } = useCanvasCoreStore();
  const camera = useCanvasCamera();

  const [prevPoint, setPrevPoint] = useState<ICanvasPoint>({ x: 0, y: 0 });
  const [originPoint, setOriginPoint] = useState<ICanvasPoint>({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const pointerTimestamp = useRef<number>(0);

  const getPointFromEvent = useCallback(
    (event: React.PointerEvent) => {
      let point: ICanvasPoint;
      if (useCameraTransformation) point = CommonUtils.getTransformedEventPoint(event, bounds, camera);
      else point = CommonUtils.getPoint(event, bounds);

      return point;
    },
    [bounds, camera, useCameraTransformation]
  );

  const onPointerMove = (event: React.PointerEvent) => {
    if (!isMouseDown) return;

    // Workaround to fix unwanted results when dev tools are open. It seems like events are triggered more.
    if (event.timeStamp - pointerTimestamp.current < 1000 / 60) return;
    pointerTimestamp.current = event.timeStamp;

    const point = getPointFromEvent(event);
    const delta = CanvasPoint.sub(point, originPoint);
    const trueDelta = CanvasPoint.sub(delta, prevPoint);

    setPrevPoint(delta);

    onPointerMoveCallback(trueDelta);
  };

  const onPointerUp = (event: React.PointerEvent) => {
    setIsMouseDown(false);
    setOriginPoint({ x: 0, y: 0 });
    setPrevPoint({ x: 0, y: 0 });

    onPointerUpCallback(event);
  };

  const onPointerDown = (event: React.PointerEvent) => {
    const point = getPointFromEvent(event);

    setIsMouseDown(true);
    setOriginPoint(point);

    onPointerDownCallback(event);
  };

  return {
    events: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
    },
  };
};
