import { useCallback, useEffect } from 'react';
import { useCanvasCore } from '../core/use-canvas-core';
import { ICanvasBounds } from '@shapes/types';

export const useCanvasBounds = () => {
  const { setBounds, canvasRef, bounds } = useCanvasCore();

  const handleBoundsResize = useCallback(() => {
    if (!canvasRef) return;

    const { left, top, width, height } = canvasRef.getBoundingClientRect();

    const updatedBounds: ICanvasBounds = {
      min: {
        x: left,
        y: top,
      },
      max: {
        x: left + width,
        y: top + height,
      },
    };
    setBounds(updatedBounds);
  }, [canvasRef]);

  useEffect(() => {
    handleBoundsResize();
  }, [canvasRef]);

  useEffect(() => {
    window.addEventListener('scroll', handleBoundsResize);
    window.addEventListener('resize', handleBoundsResize);

    return () => {
      window.removeEventListener('scroll', handleBoundsResize);
      window.removeEventListener('resize', handleBoundsResize);
    };
  }, []);

  return {
    bounds,
  };
};
