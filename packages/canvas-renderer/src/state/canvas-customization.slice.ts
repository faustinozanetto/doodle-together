import { ShapeUtils } from '@shapes/shape-utils';
import { ICanvasShapeCustomization } from '@shapes/types';
import { create } from 'zustand';

export type CanvasCustomizationSliceState = {
  customization: ICanvasShapeCustomization;
};

export type CanvasCustomizationSliceActions = {
  setColor: (color: ICanvasShapeCustomization['color']) => void;
  setSize: (size: ICanvasShapeCustomization['size']) => void;
  setStyle: (style: ICanvasShapeCustomization['style']) => void;
};

export const useCanvasCustomizationStore = create<CanvasCustomizationSliceState & CanvasCustomizationSliceActions>(
  (set, get) => ({
    customization: ShapeUtils.getShapeBaseCustomization(),
    setColor: (color) => {
      const customization: ICanvasShapeCustomization = { ...get().customization, color };
      set({ customization });
    },
    setSize: (size) => {
      const customization: ICanvasShapeCustomization = { ...get().customization, size };
      set({ customization });
    },
    setStyle: (style) => {
      const customization: ICanvasShapeCustomization = { ...get().customization, style };
      set({ customization });
    },
  })
);
