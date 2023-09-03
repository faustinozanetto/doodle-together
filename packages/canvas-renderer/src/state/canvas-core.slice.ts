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
  selectedNodeId: string | null;
  activeNodeId: string | null;
};

export type CanvasCoreSliceActions = {
  setCurrentState: (currentState: CanvasState) => void;
  setBounds: (bounds: ICanvasBounds) => void;
  setCanvasRef: (canvasRef: ElementRef<'div'>) => void;
  setSelectedToolType: (type: CanvasToolTypes) => void;
  setSelectedNodeId: (id: string) => void;
  clearSelectedNode: () => void;
  setActiveNodeId: (id: string) => void;
  clearActiveNode: () => void;
};

export const useCanvasCoreStore = create<CanvasCoreSliceState & CanvasCoreSliceActions>((set) => ({
  canvasRef: null,
  currentState: CanvasState.Idling,
  selectedToolType: 'draw',
  bounds: {
    min: { x: Infinity, y: Infinity },
    max: { x: -Infinity, y: -Infinity },
  },
  selectedNodeId: null,
  activeNodeId: null,
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
  setSelectedNodeId: (id) => {
    set({ selectedNodeId: id });
  },
  clearSelectedNode: () => {
    set({ selectedNodeId: null });
  },
  setActiveNodeId: (id) => {
    set({ activeNodeId: id });
  },
  clearActiveNode: () => {
    set({ activeNodeId: null });
  },
}));
