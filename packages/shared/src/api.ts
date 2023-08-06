import { Room } from './common';

export type CreateRoomApiResponse = {
  accessToken: string;
  room: Room;
};

export type JoinRoomApiResponse = {
  accessToken: string;
  room: Room;
};

export type LeaveRoomApiResponse = {
  left: boolean;
};
