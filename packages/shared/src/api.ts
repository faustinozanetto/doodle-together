import { Room } from '@doodle-together/database';

export type CreateRoomApiResponse = {
  room: Room;
};

export type JoinRoomApiResponse = {
  room: Room;
};

export type LeaveRoomApiResponse = {
  left: boolean;
};
