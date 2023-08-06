import { Room } from '@doodle-together/database';
import { proxy } from 'valtio';

export type RoomSliceState = {
  room: Room | null;
};

export const roomState = proxy<RoomSliceState>({ room: null });

export const roomActions = {
  setRoom: (room: Room): void => {
    roomState.room = room;
  },
};

export type RoomActions = typeof roomActions;
