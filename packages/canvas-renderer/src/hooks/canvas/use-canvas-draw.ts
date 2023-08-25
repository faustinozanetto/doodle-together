import { useRef } from 'react';
import { useCanvasCamera } from '../camera/use-canvas-camera';
import { CanvasPoint, ICanvasPoint } from '@common/canvas-point';
import { CommonUtils } from '@utils/common-utils';
import { useCanvasCore } from '../core/use-canvas-core';

type PointerMoveData = {
  cursorPoint: ICanvasPoint;
  originPoint: ICanvasPoint | null;
  topLeftPoint: ICanvasPoint | null;
  points: ICanvasPoint[];
  translatedPoints: ICanvasPoint[];
};

type UseCanvasDrawParams = {
  /**
   * Callback function executed when pointer up.
   * @param event Event
   */
  onPointerUpCallback: (event: React.PointerEvent<HTMLDivElement>) => void;
  /**
   * Callback function executed when pointer down.
   * @param event Event
   */
  onPointerDownCallback: (event: React.PointerEvent<HTMLDivElement>) => void;
  /**
   * Callback function executed when pointer moves.
   * @param event Event
   */
  onPointerMoveCallback: (data: PointerMoveData) => void;
};

type UseCanvasEventsReturn = {
  onDrawPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
  onDrawPointerUp: (event: React.PointerEvent<HTMLDivElement>) => void;
  onDrawPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
};

/**
 * Main hook responsible for the mouse interactions and points registrations.
 */
export const useCanvasDraw = ({
  onPointerUpCallback,
  onPointerDownCallback,
  onPointerMoveCallback,
}: UseCanvasDrawParams): UseCanvasEventsReturn => {
  const camera = useCanvasCamera();
  const { bounds } = useCanvasCore();

  const isMouseDown = useRef<boolean>(false);
  const originPoint = useRef<ICanvasPoint | null>(null);
  const topLeftPoint = useRef<ICanvasPoint | null>(null);
  const cursorPoint = useRef<ICanvasPoint>({ x: 0, y: 0 });

  const points = useRef<ICanvasPoint[]>([]);
  const translatedPoints = useRef<ICanvasPoint[]>([]);

  const onDrawPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isMouseDown || !originPoint.current || !topLeftPoint.current) return;

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

    const data: PointerMoveData = {
      cursorPoint: cursorPoint.current,
      originPoint: originPoint.current,
      points: points.current,
      topLeftPoint: topLeftPoint.current,
      translatedPoints: translatedPoints.current,
    };
    onPointerMoveCallback(data);
  };

  const onDrawPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    isMouseDown.current = false;
    originPoint.current = null;
    points.current = [];
    translatedPoints.current = [];

    onPointerUpCallback(event);
  };

  const onDrawPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    isMouseDown.current = true;

    const transformedPoint = CommonUtils.getTransformedEventPoint(event, bounds, camera);

    topLeftPoint.current = transformedPoint;
    originPoint.current = transformedPoint;

    onPointerDownCallback(event);
  };

  return {
    onDrawPointerMove,
    onDrawPointerUp,
    onDrawPointerDown,
  };
};
