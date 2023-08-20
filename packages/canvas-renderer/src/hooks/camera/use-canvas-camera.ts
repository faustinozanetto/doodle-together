import { useCanvasBounds } from '@hooks/bounds/use-canvas-bounds';
import { useCanvasCameraContext } from './use-canvas-camera-context';
import { ShapeUtils } from '@shapes/shape-utils';
import { CanvasPoint, ICanvasPoint } from '@common/canvas-point';
import { CanvasCameraActionType } from '@context/canvas-camera/types';

export const useCanvasCamera = (zoomStepSize: number = 0.1, zoomMin: number = 0.1, zoomMax: number = 5) => {
  const { bounds } = useCanvasBounds();
  const { state, dispatch } = useCanvasCameraContext();

  const parseZoom = (zoom: number): number => {
    return +Math.min(Math.max(zoom, zoomMin), zoomMax).toFixed(2);
  };

  const recalculatePositionFromZoom = (prevPosition: ICanvasPoint, prevZoom: number, newZoom: number) => {
    const canvasCenter = ShapeUtils.getBoundsCenter(bounds);

    const pointA = CanvasPoint.sub(CanvasPoint.div(canvasCenter, prevZoom), prevPosition);
    const pointB = CanvasPoint.sub(CanvasPoint.div(canvasCenter, newZoom), prevPosition);

    const newPosition = CanvasPoint.add(prevPosition, CanvasPoint.sub(pointB, pointA));

    dispatch({ type: CanvasCameraActionType.SET_POSITION, payload: { position: newPosition } });
    dispatch({ type: CanvasCameraActionType.SET_ZOOM, payload: { zoom: newZoom } });
  };

  const zoomIn = () => {
    const newZoom = parseZoom(state.zoom + zoomStepSize);
    recalculatePositionFromZoom(state.position, state.zoom, newZoom);
  };

  const zoomOut = () => {
    const newZoom = parseZoom(state.zoom - zoomStepSize);
    recalculatePositionFromZoom(state.position, state.zoom, newZoom);
  };

  return {
    zoomIn,
    zoomOut,
    zoom: state.zoom,
    position: state.position,
  };
};
