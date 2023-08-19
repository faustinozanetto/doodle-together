import { useCameraContext } from './use-camera-context';
import { CameraActionType } from '../context/camera/types';
import { ShapeUtils } from '../shapes';
import { useCanvasBounds } from './use-canvas-bounds';
import { ICanvasPoint, CanvasPoint } from '../common/canvas-point';

export const useCamera = (zoomStepSize: number = 0.1, zoomMin: number = 0.1, zoomMax: number = 5) => {
  const { bounds } = useCanvasBounds();
  const { state, dispatch } = useCameraContext();

  const parseZoom = (zoom: number): number => {
    return +Math.min(Math.max(zoom, zoomMin), zoomMax).toFixed(2);
  };

  const recalculatePositionFromZoom = (prevPosition: ICanvasPoint, prevZoom: number, newZoom: number) => {
    const canvasCenter = ShapeUtils.getBoundsCenter(bounds);

    const pointA = CanvasPoint.sub(CanvasPoint.div(canvasCenter, prevZoom), prevPosition);
    const pointB = CanvasPoint.sub(CanvasPoint.div(canvasCenter, newZoom), prevPosition);

    const newPosition = CanvasPoint.add(prevPosition, CanvasPoint.sub(pointB, pointA));
    console.log({ canvasCenter, prevPosition, prevZoom, newZoom, newPosition });

    dispatch({ type: CameraActionType.SET_POSITION, payload: { position: newPosition } });
    dispatch({ type: CameraActionType.SET_ZOOM, payload: { zoom: newZoom } });
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
