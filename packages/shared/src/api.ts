import { User } from '@doodle-together/database';
import { RoomWithUsers } from '.';

export type CreateRoomApiResponse = {
  room: RoomWithUsers;
  user: User;
};

export type JoinRoomApiResponse = {
  room: RoomWithUsers;
  user: User;
};

export type LeaveRoomApiResponse = {
  left: boolean;
};
