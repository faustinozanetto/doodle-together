import { CanvasShapeTypes, ICanvasBounds } from '@shapes/types';
import { ElementRef } from 'react';
import { create } from 'zustand';

export type CanvasCoreSliceState = {
  canvasRef: ElementRef<'div'> | null;
  bounds: ICanvasBounds;
  selectedShapeType: CanvasShapeTypes;
};

export type CanvasCoreSliceActions = {
  setBounds: (bounds: ICanvasBounds) => void;
  setCanvasRef: (canvasRef: ElementRef<'div'>) => void;
  setSelectedShapeType: (type: CanvasShapeTypes) => void;
};

export const useCanvasCoreStore = create<CanvasCoreSliceState & CanvasCoreSliceActions>((set) => ({
  canvasRef: null,
  selectedShapeType: CanvasShapeTypes.Draw,
  bounds: {
    min: { x: Infinity, y: Infinity },
    max: { x: -Infinity, y: -Infinity },
  },
  setBounds: (bounds) => {
    set({ bounds });
  },
  setCanvasRef: (canvasRef) => {
    set({ canvasRef });
  },
  setSelectedShapeType: (type) => {
    set({ selectedShapeType: type });
  },
}));
