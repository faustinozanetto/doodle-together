import { RoomActionType, RoomActions, RoomContextState } from '@modules/room/types/room.types';

export const reducer = (state: RoomContextState, action: RoomActions): RoomContextState => {
  switch (action.type) {
    case RoomActionType.SET_TOOL: {
      return {
        ...state,
        tool: action.payload.tool,
      };
    }

    default:
      throw new Error('The action you requested does not exists!');
  }
};
