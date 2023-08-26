import { ICanvasPoint, CanvasPoint } from '@common/canvas-point';
import { useCanvasCamera } from '@hooks/camera/use-canvas-camera';
import { useCanvasCore } from '@hooks/core/use-canvas-core';
import { CommonUtils } from '@utils/common-utils';
import { useState } from 'react';
import { useThrottle } from './use-throttle';

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

  const { bounds } = useCanvasCore();
  const camera = useCanvasCamera();

  const [prevPoint, setPrevPoint] = useState<ICanvasPoint>({ x: 0, y: 0 });
  const [originPoint, setOriginPoint] = useState<ICanvasPoint>({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const getPointFromEvent = (event: React.PointerEvent) => {
    let point: ICanvasPoint;
    if (useCameraTransformation) point = CommonUtils.getTransformedEventPoint(event, bounds, camera);
    else point = CommonUtils.getPoint(event, bounds);

    return point;
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!isMouseDown || !originPoint) return;

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
