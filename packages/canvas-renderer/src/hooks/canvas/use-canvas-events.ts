import { useRef } from 'react';
import { useCanvasCamera } from '../camera/use-canvas-camera';
import { CanvasPoint, ICanvasPoint } from '@common/canvas-point';
import { CommonUtils } from '@utils/common-utils';
import { useCanvasCore } from '../core/use-canvas-core';
import { ICanvasEvenetsData } from '@shapes/types';

type UseCanvasEventsParams = {
  /** Callback function executed when the mouse is released */
  onPointerUpCallback: (event: React.PointerEvent<HTMLDivElement>) => void;
  /** Callback function executed when the mouse is pressed */
  onPointerDownCallback: (event: React.PointerEvent<HTMLDivElement>) => void;
  /** Callback function executed when the mouse moves */
  onPointerMoveCallback: (event: React.PointerEvent<HTMLDivElement>) => void;
  onClickCallback: (event: React.MouseEvent<HTMLDivElement>) => void;
};

type UseCanvasEvents = {
  events: {
    onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
    onPointerUp: (event: React.PointerEvent<HTMLDivElement>) => void;
    onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  };
  data: ICanvasEvenetsData;
};

/**
 * Main hook responsible for the mouse interactions and points registrations.
 */
export const useCanvasEvents = ({
  onPointerUpCallback,
  onPointerDownCallback,
  onPointerMoveCallback,
  onClickCallback,
}: UseCanvasEventsParams): UseCanvasEvents => {
  const camera = useCanvasCamera();
  const { bounds } = useCanvasCore();

  const isMouseDown = useRef<boolean>(false);
  const originPoint = useRef<ICanvasPoint | null>(null);
  const topLeftPoint = useRef<ICanvasPoint | null>(null);
  const cursorPoint = useRef<ICanvasPoint>({ x: 0, y: 0 });

  const points = useRef<ICanvasPoint[]>([]);
  const translatedPoints = useRef<ICanvasPoint[]>([]);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isMouseDown || !originPoint.current || !topLeftPoint.current) return;

    // Update cursor point
    const transformedPoint = CommonUtils.getTransformedEventPoint(event, bounds, camera);
    cursorPoint.current = transformedPoint;

    const translatedPoint = CanvasPoint.sub(cursorPoint.current, originPoint.current);

    points.current = [...points.current, translatedPoint];

    const previousTopLeftPoint = topLeftPoint.current;
    const newTopLeftPoint: ICanvasPoint = {
      x: Math.min(topLeftPoint.current.x, cursorPoint.current.x),
      y: Math.min(topLeftPoint.current.y, cursorPoint.current.y),
    };

    const deltaPoint = CanvasPoint.sub(newTopLeftPoint, originPoint.current);

    let tempPoints: ICanvasPoint[] = [];
    // Top left point changed
    if (previousTopLeftPoint.x !== newTopLeftPoint.x || previousTopLeftPoint.y !== newTopLeftPoint.y) {
      topLeftPoint.current = newTopLeftPoint;

      tempPoints = points.current.map((point) => {
        return CanvasPoint.sub(point, deltaPoint);
      });
    } else {
      tempPoints = [
        ...translatedPoints.current,
        CanvasPoint.sub(translatedPoint, CanvasPoint.sub(topLeftPoint.current, originPoint.current)),
      ];
    }

    translatedPoints.current = tempPoints;
    onPointerMoveCallback(event);
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    isMouseDown.current = false;
    originPoint.current = null;
    points.current = [];
    translatedPoints.current = [];

    onPointerUpCallback(event);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    isMouseDown.current = true;

    const transformedPoint = CommonUtils.getTransformedEventPoint(event, bounds, camera);

    topLeftPoint.current = transformedPoint;
    originPoint.current = transformedPoint;

    onPointerDownCallback(event);
  };

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClickCallback(event);
  };

  return {
    events: {
      onPointerMove,
      onPointerUp,
      onPointerDown,
      onClick,
    },
    data: {
      originPoint: originPoint.current,
      cursorPoint: cursorPoint.current,
      topLeftPoint: topLeftPoint.current,
      points: points.current,
      translatedPoints: translatedPoints.current,
    },
  };
};
