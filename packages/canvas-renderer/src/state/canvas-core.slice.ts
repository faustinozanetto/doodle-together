import { CanvasToolTypes, ICanvasBounds } from '@shapes/types';
import { ElementRef } from 'react';
import { create } from 'zustand';

export enum CanvasState {
  Idling = 'Idling',
  Editing = 'Editing',
  Drawing = 'Drawing',
  Dragging = 'Dragging',
  Hovering = 'Hovering',
}

export type CanvasCoreSliceState = {
  canvasRef: ElementRef<'div'> | null;
  bounds: ICanvasBounds;
  selectedToolType: CanvasToolTypes;
  currentState: CanvasState;
};

export type CanvasCoreSliceActions = {
  setCurrentState: (currentState: CanvasState) => void;
  setBounds: (bounds: ICanvasBounds) => void;
  setCanvasRef: (canvasRef: ElementRef<'div'>) => void;
  setSelectedToolType: (type: CanvasToolTypes) => void;
};

export const useCanvasCoreStore = create<CanvasCoreSliceState & CanvasCoreSliceActions>((set) => ({
  canvasRef: null,
  currentState: CanvasState.Idling,
  selectedToolType: 'draw',
  bounds: {
    min: { x: Infinity, y: Infinity },
    max: { x: -Infinity, y: -Infinity },
  },
  setCurrentState: (currentState) => {
    set({ currentState });
  },
  setBounds: (bounds) => {
    set({ bounds });
  },
  setCanvasRef: (canvasRef) => {
    set({ canvasRef });
  },
  setSelectedToolType: (type) => {
    set({ selectedToolType: type });
  },
}));
