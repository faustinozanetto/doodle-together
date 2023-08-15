import { RoomToolSize, RoomToolStyle, RoomTool } from '@doodle-together/shared';
import { create } from 'zustand';

export type CustomizationBackground = {
  enableGrid: boolean;
  gridSize: number;
};

export type CustomizationSliceState = {
  color: string;
  size: RoomToolSize;
  style: RoomToolStyle;
  tool: RoomTool;
  background: CustomizationBackground;
};

export type CustomizationSliceActions = {
  setTool: (tool: RoomTool) => void;
  setSize: (size: RoomToolSize) => void;
  setStyle: (style: RoomToolStyle) => void;
  setColor: (color: string) => void;
  setBackgroundGridEnabled: (enableGrid: boolean) => void;
  setBackgroundGridSize: (gridSize: number) => void;
};

export const useCustomizationStore = create<CustomizationSliceState & CustomizationSliceActions>((set, get) => ({
  tool: 'pencil',
  color: '#ababab',
  size: 'medium',
  style: 'solid',
  background: {
    enableGrid: true,
    gridSize: 20,
  },
  // Actions
  setTool: (tool) => {
    set({ tool });
  },
  setSize: (size) => {
    set({ size });
  },
  setStyle: (style) => {
    set({ style });
  },
  setColor: (color) => {
    set({ color });
  },
  setBackgroundGridEnabled: (enableGrid) => {
    set({ background: { enableGrid, gridSize: get().background.gridSize } });
  },
  setBackgroundGridSize: (gridSize) => {
    set({ background: { gridSize, enableGrid: get().background.enableGrid } });
  },
}));
