import { useCallback, useEffect } from 'react';
import { CanvasActionType } from '../context/types';
import { ICanvasBounds } from '../shapes';
import { useCanvasContext } from './use-canvas-context';

export const useCanvasBounds = () => {
  const { state, dispatch } = useCanvasContext();

  const handleBoundsResize = useCallback(() => {
    const { canvasRef } = state;

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

    dispatch({ type: CanvasActionType.SET_BOUNDS, payload: { bounds: updatedBounds } });
  }, [state.canvasRef]);

  useEffect(() => {
    handleBoundsResize();
  }, [state.canvasRef]);

  useEffect(() => {
    window.addEventListener('resize', handleBoundsResize);
    return () => {
      window.removeEventListener('resize', handleBoundsResize);
    };
  }, []);

  return {
    bounds: state.bounds,
  };
};
