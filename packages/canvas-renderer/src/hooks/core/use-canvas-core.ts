import { ElementRef } from 'react';
import { useCanvasCoreContext } from './use-canvas-core-context';
import { CanvasCoreActionType, CanvasCoreContextState } from '@context/canvas-core/types';
import { CanvasShapeTypes, ICanvasBounds } from '@shapes/types';

interface UseCanvasCoreInterface extends CanvasCoreContextState {
  setCanvasRef: (canvasRef: ElementRef<'div'>) => void;
  setBounds: (bounds: ICanvasBounds) => void;
  setSelectedShape: (shape: CanvasShapeTypes) => void;
}

export const useCanvasCore = (): UseCanvasCoreInterface => {
  const { state, dispatch } = useCanvasCoreContext();

  const setCanvasRef = (canvasRef: ElementRef<'div'>) => {
    dispatch({ type: CanvasCoreActionType.SET_CANVAS_REF, payload: { canvasRef } });
  };

  const setBounds = (bounds: ICanvasBounds) => {
    dispatch({ type: CanvasCoreActionType.SET_BOUNDS, payload: { bounds } });
  };

  const setSelectedShape = (shape: CanvasShapeTypes) => {
    dispatch({ type: CanvasCoreActionType.SET_SELECTED_SHAPE, payload: { shape } });
  };

  return {
    setCanvasRef,
    setBounds,
    setSelectedShape,
    ...state,
  };
};
