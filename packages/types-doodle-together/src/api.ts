import { Room } from '../src/common';

export type CreateRoomApiResponse = {
  room: Room;
  accessToken: string;
};

export type JoinRoomApiResponse = {
  room: Room;
  accessToken: string;
};

export type LeaveRoomApiResponse = {
  left: boolean;
};
