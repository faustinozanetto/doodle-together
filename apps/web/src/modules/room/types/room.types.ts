import { Room } from '@doodle-together/types';
import { ActionMap } from '@modules/common/types/common.types';

export type CreateRoomApiResponse = {
  room: Room;
  accessToken: string;
};

export type JoinRoomApiResponse = {
  room: Room;
  accessToken: string;
};

/* Room Context Types */
export type RoomTool = 'pencil' | 'eraser' | 'clear';

export type RoomToolSize = 'small' | 'medium' | 'large' | 'extra-large';

export type RoomToolStyle = 'solid' | 'dashed' | 'dotted';

export type RoomToolCustomization = {
  color: string;
  size: RoomToolSize;
  style: RoomToolStyle;
};

export type RoomContextState = {
  roomId: string;
  tool: RoomTool;
  toolCustomization: RoomToolCustomization;
};

export type RoomContextData = {
  state: RoomContextState;
  dispatch: React.Dispatch<RoomActions>;
};

export enum RoomActionType {
  SET_ROOM,
  SET_TOOL,
  SET_TOOL_COLOR,
  SET_TOOL_SIZE,
  SET_TOOL_STYLE,
}

export type RoomPayload = {
  [RoomActionType.SET_ROOM]: {
    roomId: string;
  };
  [RoomActionType.SET_TOOL]: {
    tool: RoomTool;
  };
  [RoomActionType.SET_TOOL_COLOR]: {
    color: string;
  };
  [RoomActionType.SET_TOOL_SIZE]: {
    size: RoomToolSize;
  };
  [RoomActionType.SET_TOOL_STYLE]: {
    style: RoomToolStyle;
  };
};

export type RoomActions = ActionMap<RoomPayload>[keyof ActionMap<RoomPayload>];
