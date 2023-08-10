import { RoomToolSize, RoomToolStyle, RoomTool } from '@doodle-together/shared';
import { proxy } from 'valtio';

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

const initialState: CustomizationSliceState = {
  tool: 'pencil',
  color: '#ababab',
  size: 'medium',
  style: 'solid',
  background: {
    enableGrid: true,
    gridSize: 20,
  },
};

export const customizationState = proxy<CustomizationSliceState>(initialState);

export const customizationActions = {
  setTool: (tool: RoomTool): void => {
    customizationState.tool = tool;
  },
  setSize: (size: RoomToolSize): void => {
    customizationState.size = size;
  },
  setStyle: (style: RoomToolStyle): void => {
    customizationState.style = style;
  },
  setColor: (color: string): void => {
    customizationState.color = color;
  },
  setBackgroundGridEnabled: (enableGrid: boolean) => {
    customizationState.background.enableGrid = enableGrid;
  },
  setBackgroundGridSize: (gridSize: number) => {
    customizationState.background.gridSize = gridSize;
  },
};

export type CustomizationActions = typeof customizationActions;
