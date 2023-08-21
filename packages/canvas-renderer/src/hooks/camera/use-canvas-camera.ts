import { useCanvasBounds } from '@hooks/bounds/use-canvas-bounds';
import { ShapeUtils } from '@utils/shape-utils';
import { CanvasPoint, ICanvasPoint } from '@common/canvas-point';
import { useCanvasCameraStore } from '@state/canvas-camera.slice';

export const useCanvasCamera = (zoomStepSize: number = 0.1, zoomMin: number = 0.1, zoomMax: number = 5) => {
  const { bounds } = useCanvasBounds();
  const { setPosition, setZoom, position, zoom } = useCanvasCameraStore();

  const parseZoom = (zoom: number): number => {
    return +Math.min(Math.max(zoom, zoomMin), zoomMax).toFixed(2);
  };

  const recalculatePositionFromZoom = (prevPosition: ICanvasPoint, prevZoom: number, newZoom: number) => {
    const canvasCenter = ShapeUtils.getBoundsCenter(bounds);

    const pointA = CanvasPoint.sub(CanvasPoint.div(canvasCenter, prevZoom), prevPosition);
    const pointB = CanvasPoint.sub(CanvasPoint.div(canvasCenter, newZoom), prevPosition);

    const newPosition = CanvasPoint.add(prevPosition, CanvasPoint.sub(pointB, pointA));

    setPosition(newPosition);
    setZoom(newZoom);
  };

  const zoomIn = () => {
    const newZoom = parseZoom(zoom + zoomStepSize);
    recalculatePositionFromZoom(position, zoom, newZoom);
  };

  const zoomOut = () => {
    const newZoom = parseZoom(zoom - zoomStepSize);
    recalculatePositionFromZoom(position, zoom, newZoom);
  };

  return {
    zoomIn,
    zoomOut,
    zoom,
    position,
  };
};
