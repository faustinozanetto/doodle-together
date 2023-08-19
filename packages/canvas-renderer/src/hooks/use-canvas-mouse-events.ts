import { useRef, useState } from 'react';
import { CanvasPoint } from '../shapes';
import { useCanvasBounds } from './use-canvas-bounds';

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

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const originPoint = useRef<CanvasPoint | null>(null);
  const topLeftPoint = useRef<CanvasPoint | null>(null);
  const cursorPoint = useRef<CanvasPoint>({ x: 0, y: 0 });

  const points = useRef<CanvasPoint[]>([]);
  const translatedPoints = useRef<CanvasPoint[]>([]);

  const updateCursorPoint = (clientX: number, clientY: number) => {
    const point: CanvasPoint = {
      x: +clientX.toFixed(2) - bounds.min.x,
      y: +clientY.toFixed(2) - bounds.min.y,
    };

    cursorPoint.current = point;
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;

    updateCursorPoint(clientX, clientY);

    if (!isMouseDown || !originPoint.current || !topLeftPoint.current) return;

    const translatedPoint: CanvasPoint = {
      x: cursorPoint.current.x - originPoint.current.x,
      y: cursorPoint.current.y - originPoint.current.y,
    };

    points.current = [...points.current, translatedPoint];

    const previousTopLeftPoint: CanvasPoint = topLeftPoint.current;
    const newTopLeftPoint: CanvasPoint = {
      x: Math.min(topLeftPoint.current.x, cursorPoint.current.x),
      y: Math.min(topLeftPoint.current.y, cursorPoint.current.y),
    };

    const deltaPoint: CanvasPoint = {
      x: newTopLeftPoint.x - originPoint.current.x,
      y: newTopLeftPoint.y - originPoint.current.y,
    };

    let tempPoints: CanvasPoint[] = [];
    // Top left point changed
    if (previousTopLeftPoint.x !== newTopLeftPoint.x || previousTopLeftPoint.y !== newTopLeftPoint.y) {
      topLeftPoint.current = newTopLeftPoint;

      tempPoints = points.current.map((point) => {
        return {
          x: point.x - deltaPoint.x,
          y: point.y - deltaPoint.y,
        };
      });
    } else {
      const subtracted: CanvasPoint = {
        x: topLeftPoint.current.x - originPoint.current.x,
        y: topLeftPoint.current.y - originPoint.current.y,
      };

      const newPoint: CanvasPoint = {
        x: translatedPoint.x - subtracted.x,
        y: translatedPoint.y - subtracted.y,
      };

      tempPoints = [...translatedPoints.current, newPoint];
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
