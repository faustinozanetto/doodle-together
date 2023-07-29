import { RoomActionType, RoomActions, RoomContextState } from '@modules/room/types/room.types';

export const reducer = (state: RoomContextState, action: RoomActions): RoomContextState => {
  switch (action.type) {
    case RoomActionType.SET_ROOM: {
      return {
        ...state,
        roomId: action.payload.roomId,
      };
    }
    case RoomActionType.SET_TOOL: {
      return {
        ...state,
        tool: action.payload.tool,
      };
    }
    case RoomActionType.SET_TOOL_COLOR: {
      return {
        ...state,
        toolCustomization: {
          ...state.toolCustomization,
          color: action.payload.color,
        },
      };
    }
    case RoomActionType.SET_TOOL_SIZE: {
      return {
        ...state,
        toolCustomization: {
          ...state.toolCustomization,
          size: action.payload.size,
        },
      };
    }
    case RoomActionType.SET_TOOL_STYLE: {
      return {
        ...state,
        toolCustomization: {
          ...state.toolCustomization,
          style: action.payload.style,
        },
      };
    }

    default:
      throw new Error('The action you requested does not exists!');
  }
};
