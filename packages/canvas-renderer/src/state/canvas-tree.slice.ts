import { ShapesFactory } from '@shapes/shapes-factory';
import { CanvasShapeToolTypes, CanvasShapes, ICanvasShapeCustomization } from '@shapes/types';
import { create } from 'zustand';

export type CanvasTreeNode = CanvasShapes;

export type CanvasTreeSliceState = {
  nodes: CanvasTreeNode[];
  selectedNodeId: string | null;
  activeNodeId: string | null;
};

export type CanvasTreeSliceActions = {
  addNode: (type: CanvasShapeToolTypes, customization?: ICanvasShapeCustomization) => CanvasTreeNode;
  removeNode: (id: string) => void;
  updateNode: (id: string, data: CanvasShapes) => void;
  setSelectedNodeId: (id: string) => void;
  clearSelectedNode: () => void;
  setActiveNodeId: (id: string) => void;
  clearActiveNode: () => void;
};

export const useCanvasTreeStore = create<CanvasTreeSliceState & CanvasTreeSliceActions>((set, get) => ({
  nodes: [],
  selectedNodeId: null,
  activeNodeId: null,
  addNode: (type, customization) => {
    const node = ShapesFactory.createShape(type);
    if (customization) node.customization = customization;

    const updatedNodes = [...get().nodes, node];
    set({ nodes: updatedNodes });
    return node;
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
