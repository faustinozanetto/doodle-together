import { Room, User } from '../src/common';

export type CreateRoomApiResponse = {
  me: User;
  room: Room;
};

export type JoinRoomApiResponse = {
  me: User;
  room: Room;
};

export type LeaveRoomApiResponse = {
  left: boolean;
};
