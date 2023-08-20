import { useCanvasCoreStore } from '@state/canvas-core.slice';

export const useCanvasCore = () => {
  const {
    setCanvasRef,
    setBounds,
    setSelectedToolType,
    bounds,
    canvasRef,
    selectedToolType,
    setCurrentState,
    currentState,
  } = useCanvasCoreStore();

  return {
    setCanvasRef,
    setBounds,
    setSelectedToolType,
    setCurrentState,
    currentState,
    canvasRef,
    bounds,
    selectedToolType,
  };
};
