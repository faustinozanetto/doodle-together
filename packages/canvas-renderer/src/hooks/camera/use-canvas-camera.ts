import { useCanvasBounds } from '@hooks/bounds/use-canvas-bounds';
import { ShapeUtils } from '@utils/shape-utils';
import { CanvasPoint, ICanvasPoint } from '@common/canvas-point';
import { useCanvasCameraStore } from '@state/canvas-camera.slice';

type UseCanvasCameraReturn = {
  /**
   * Camera position setter.
   * @param position Camera position.
   */
  setPosition: (position: ICanvasPoint) => void;
  /**
   * Zooms in using step size.
   */
  zoomIn: () => void;
  /**
   * Zooms out using step size.
   */
  zoomOut: () => void;
  /** Current camera zoom */
  zoom: number;
  /** Current camera position */
  position: ICanvasPoint;
};

/**
 * Hook responsible for managing the camera state.
 * @param zoomStepSize Zoom step size. Default = 0.25
 * @param zoomMin Minimum zoom. Default = 0.1
 * @param zoomMax Maximum zoom. Default = 3
 */
export const useCanvasCamera = (
  zoomStepSize: number = 0.25,
  zoomMin: number = 0.1,
  zoomMax: number = 3
): UseCanvasCameraReturn => {
  const { bounds } = useCanvasBounds();
  const { setPosition, setZoom, position, zoom } = useCanvasCameraStore();

  /**
   * Function responsible for maintaining zoom in range.
   * @param zoom Zoom value.
   * @returns Parsed zoom value.
   */
  const parseZoom = (zoom: number): number => {
    return +Math.min(Math.max(zoom, zoomMin), zoomMax).toFixed(2);
  };

  /**
   * Function responsible for handling the new position that results after a zoom change.
   * @param prevPosition Previous camera position.
   * @param prevZoom Previous camera zoom.
   * @param newZoom New camera zoom.
   */
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
    setPosition,
    zoomIn,
    zoomOut,
    zoom,
    position,
  };
};
