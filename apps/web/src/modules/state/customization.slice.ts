import { RoomTool, RoomToolSize, RoomToolStyle } from '@modules/room/types/room.types';
import { proxy } from 'valtio';

export type CustomizationSliceState = {
  color: string;
  size: RoomToolSize;
  style: RoomToolStyle;
  tool: RoomTool;
};

const initialState: CustomizationSliceState = {
  tool: 'pencil',
  color: '#ababab',
  size: 'medium',
  style: 'solid',
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
};

export type CustomizationActions = typeof customizationActions;
