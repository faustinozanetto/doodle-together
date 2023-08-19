import { useEffect, useRef } from 'react';
import { CanvasPoint } from '../shapes';
import { useCanvasContext } from './use-canvas-context';
import { useCanvasBounds } from './use-canvas-bounds';

type UseCanvasMouseEventsProps = {};

export const useCanvasMouseEvents = () => {
  const originPoint = useRef<CanvasPoint | null>();
  const cursorPoint = useRef<CanvasPoint>({ x: 0, y: 0 });

  const { bounds } = useCanvasBounds();

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;

    const point: CanvasPoint = {
      x: +clientX.toFixed(2) - bounds.min.x,
      y: +clientY.toFixed(2) - bounds.min.y,
    };

    cursorPoint.current = point;
  };

  return { onPointerMove, cursorPoint: cursorPoint.current };
};
