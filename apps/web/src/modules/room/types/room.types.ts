import { Room } from '@doodle-together/database';
import { ActionMap } from '@modules/common/types/common.types';

export type CreateRoomApiResponse = {
  room: Room;
};

/* Room Context Types */
export type RoomTool = 'pencil' | 'eraser' | 'clear';

export type RoomContextState = {
  tool: RoomTool;
};

export type RoomContextData = {
  state: RoomContextState;
  dispatch: React.Dispatch<RoomActions>;
};

export enum RoomActionType {
  SET_TOOL,
}

export type RoomPayload = {
  [RoomActionType.SET_TOOL]: {
    tool: RoomTool;
  };
};

export type RoomActions = ActionMap<RoomPayload>[keyof ActionMap<RoomPayload>];
