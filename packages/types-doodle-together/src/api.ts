import { Room, User } from '../src/common';

export type CreateRoomApiResponse = {
  room: Room;
  me: User;
};

export type JoinRoomApiResponse = {
  room: Room;
  me: User;
};

export type LeaveRoomApiResponse = {
  left: boolean;
};
