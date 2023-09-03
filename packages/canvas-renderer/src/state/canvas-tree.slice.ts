import { DeepPartial } from '@common/types';
import { ShapesFactory } from '@shapes/shapes-factory';
import { CanvasShapeToolTypes, CanvasShapes, ICanvasShapeCustomization } from '@shapes/types';
import { produce } from 'immer';

import { StateCreator, StoreApi, create } from 'zustand';

export type CanvasTreeNode = CanvasShapes;

export type CanvasTreeSliceState = {
  nodes: CanvasTreeNode[];
};

export type CanvasTreeSliceActions = {
  setNodes: (nodes: CanvasTreeNode[]) => void;
  clerNodes: () => void;
  addNode: (type: CanvasShapeToolTypes, customization?: ICanvasShapeCustomization) => void;
  removeNode: (id: string) => void;
  updateNode: (id: string, data: DeepPartial<CanvasShapes>) => void;
};

type Middleware<S> = (
  config: StateCreator<S>
) => (set: StoreApi<S>['setState'], get: StoreApi<S>['getState'], api: StoreApi<S>) => S;

const log: Middleware<CanvasTreeSliceState & CanvasTreeSliceActions> = (config) => (set, get, api) =>
  config(
    (args) => {
      const changes = args;
      console.log({ changes });
      if (typeof changes === 'function') {
        const res = changes(get());
        console.log({ res });
      }

      console.log('  applying', args);
      set(args);
      console.log('  new state', get());
    },
    get,
    api
  );

export const useCanvasTreeStore = create<CanvasTreeSliceState & CanvasTreeSliceActions>(
  log((set) => ({
    nodes: [],
    setNodes: (nodes) => {
      set({ nodes });
    },
    clerNodes: () => {
      set({ nodes: [] });
    },
    addNode: (type, customization) =>
      set(
        produce((state: CanvasTreeSliceState) => {
          const node = ShapesFactory.createShape(type);
          if (customization) node.customization = customization;
          state.nodes.push(node);
        })
      ),
    removeNode: (id) =>
      set(
        produce((state: CanvasTreeSliceState) => {
          const index = state.nodes.findIndex((node) => node.id === id);

          if (index !== -1) state.nodes.splice(index, 1);
        })
      ),
    updateNode: (id, data) =>
      set(
        produce((state: CanvasTreeSliceState) => {
          const index = state.nodes.findIndex((node) => node.id === id);

          if (index !== -1) Object.assign(state.nodes[index], data);
        })
      ),
  }))
);
