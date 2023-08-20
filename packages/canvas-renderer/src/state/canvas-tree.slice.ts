import { ShapesFactory } from '@shapes/shapes-factory';
import { CanvasShapeTypes, CanvasShapes } from '@shapes/types';
import { create } from 'zustand';

export type CanvasTreeNode = CanvasShapes;

export type CanvasTreeSliceState = {
  nodes: CanvasTreeNode[];
  selectedNodeId: string | null;
};

export type CanvasTreeSliceActions = {
  addNode: (type: CanvasShapeTypes) => void;
  removeNode: (id: string) => void;
  updateNode: (id: string, data: CanvasShapes) => void;
  selectNode: (id: string) => void;
  deselectNode: () => void;
};

export const useCanvasTreeStore = create<CanvasTreeSliceState & CanvasTreeSliceActions>((set, get) => ({
  nodes: [],
  selectedNodeId: null,
  addNode: (type) => {
    const node = ShapesFactory.createShape(type);
    const nodes = [...get().nodes, node];
    set({ nodes });
  },
  removeNode: (id) => {
    const updatedNodes: CanvasTreeNode[] = get().nodes.filter((node) => node.id !== id);
    set({ nodes: updatedNodes });
  },
  updateNode: (id, data) => {
    const updatedNodes: CanvasTreeNode[] = get().nodes.map((node) => {
      if (node.id === id) {
        return {
          ...data,
        };
      }
      return { ...node };
    });
    set({ nodes: updatedNodes });
  },
  selectNode: (id) => {
    set({ selectedNodeId: id });
  },
  deselectNode: () => {
    set({ selectedNodeId: null });
  },
}));
