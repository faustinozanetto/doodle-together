import { User } from '@doodle-together/database';
import { RoomWithUsers } from '.';

export type BackendErrorResponse = {
  message: string;
  method: string;
  route: string;
  timestamp: string;
};

export type CreateRoomApiResponse = {
  room: RoomWithUsers;
  user: User;
  accessToken: string;
};

export type JoinRoomApiResponse = {
  room: RoomWithUsers;
  user: User;
  accessToken: string;
};

export type GetRoomApiResponse = {
  room: RoomWithUsers;
};

export type LeaveRoomApiResponse = {
  left: boolean;
};
