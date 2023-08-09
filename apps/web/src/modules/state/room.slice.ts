import { RoomWithUsers } from '@doodle-together/shared';
import { proxy } from 'valtio';

export type RoomSliceState = {
  room: RoomWithUsers | null;
};

export const roomState = proxy<RoomSliceState>({ room: null });

export const roomActions = {
  setRoom: (room: RoomWithUsers): void => {
    roomState.room = room;
  },
};

export type RoomActions = typeof roomActions;
