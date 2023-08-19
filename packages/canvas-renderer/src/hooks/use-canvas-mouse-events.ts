import { useRef, useState } from 'react';
import { ShapeUtils } from '../shapes';
import { useCanvasBounds } from './use-canvas-bounds';
import { useCamera } from './use-camera';
import { CanvasPoint, ICanvasPoint } from '../common/canvas-point';

type UseCanvasMouseEventsProps = {
  onPointerUpCallback: () => void;
  onPointerDownCallback: () => void;
  onPointerMoveCallback: () => void;
};

export const useCanvasMouseEvents = ({
  onPointerUpCallback,
  onPointerDownCallback,
  onPointerMoveCallback,
}: UseCanvasMouseEventsProps) => {
  const { bounds } = useCanvasBounds();
  const { zoom, position } = useCamera();

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const originPoint = useRef<ICanvasPoint | null>(null);
  const topLeftPoint = useRef<ICanvasPoint | null>(null);
  const cursorPoint = useRef<ICanvasPoint>({ x: 0, y: 0 });

  const points = useRef<ICanvasPoint[]>([]);
  const translatedPoints = useRef<ICanvasPoint[]>([]);

  const updateCursorPoint = (clientX: number, clientY: number) => {
    const clientPoint: ICanvasPoint = {
      x: +clientX.toFixed(2),
      y: +clientY.toFixed(2),
    };

    const point = CanvasPoint.sub(clientPoint, bounds.min);

    cursorPoint.current = ShapeUtils.getCameraTransformedPoint(point, {
      zoom,
      position,
    });
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;

    updateCursorPoint(clientX, clientY);

    if (!isMouseDown || !originPoint.current || !topLeftPoint.current) return;

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
    onPointerMoveCallback();
  };

  const onPointerUp = (_event: React.PointerEvent<HTMLDivElement>) => {
    // Reset state
    setIsMouseDown(false);
    originPoint.current = null;

    points.current = [];
    translatedPoints.current = [];

    onPointerUpCallback();
  };

  const onPointerDown = (_event: React.PointerEvent<HTMLDivElement>) => {
    // Initialize state
    setIsMouseDown(true);

    topLeftPoint.current = cursorPoint.current;
    originPoint.current = cursorPoint.current;

    onPointerDownCallback();
  };

  return {
    onPointerMove,
    onPointerUp,
    onPointerDown,
    isMouseDown,
    originPoint,
    cursorPoint,
    topLeftPoint,
    points,
    translatedPoints,
  };
};
