import { ICanvasPoint } from '@common/canvas-point';
import { create } from 'zustand';

export type CanvasCameraSliceState = {
  position: ICanvasPoint;
  zoom: number;
};

export type CanvasCameraSliceActions = {
  setPosition: (position: ICanvasPoint) => void;
  setZoom: (zoom: number) => void;
};

export const useCanvasCameraStore = create<CanvasCameraSliceState & CanvasCameraSliceActions>((set) => ({
  position: { x: 0, y: 0 },
  zoom: 1,
  setPosition: (position) => {
    set({ position });
  },
  setZoom: (zoom) => {
    set({ zoom });
  },
}));
