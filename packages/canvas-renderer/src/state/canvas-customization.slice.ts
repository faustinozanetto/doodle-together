import { ShapeUtils } from '@utils/shape-utils';
import { ICanvasBackgroundCustomization, ICanvasShapeCustomization } from '@shapes/types';
import { create } from 'zustand';

export type CanvasCustomizationSliceState = {
  customization: ICanvasShapeCustomization;
  background: ICanvasBackgroundCustomization;
};

export type CanvasCustomizationSliceActions = {
  setColor: (color: ICanvasShapeCustomization['color']) => void;
  setSize: (size: ICanvasShapeCustomization['size']) => void;
  setStyle: (style: ICanvasShapeCustomization['style']) => void;
  setBackgroundGridEnabled: (enableGrid: boolean) => void;
  setBackgroundGridSize: (gridSize: number) => void;
};

export const useCanvasCustomizationStore = create<CanvasCustomizationSliceState & CanvasCustomizationSliceActions>(
  (set, get) => ({
    customization: ShapeUtils.getShapeBaseCustomization(),
    background: {
      enableGrid: true,
      gridSize: 10,
    },
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
    setBackgroundGridEnabled: (enableGrid) => {
      const background: ICanvasBackgroundCustomization = { ...get().background, enableGrid };
      set({ background });
    },
    setBackgroundGridSize: (gridSize: number) => {
      const background: ICanvasBackgroundCustomization = { ...get().background, gridSize };
      set({ background });
    },
  })
);
