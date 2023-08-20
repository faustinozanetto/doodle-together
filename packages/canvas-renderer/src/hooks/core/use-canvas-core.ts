import { useCanvasCoreStore } from '@state/canvas-core.slice';

export const useCanvasCore = () => {
  const { setCanvasRef, setBounds, setSelectedShapeType, bounds, canvasRef, selectedShapeType } = useCanvasCoreStore();

  return {
    setCanvasRef,
    setBounds,
    setSelectedShapeType,
    canvasRef,
    bounds,
    selectedShapeType,
  };
};
