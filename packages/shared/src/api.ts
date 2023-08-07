import { RoomWithUsers } from '.';

export type CreateRoomApiResponse = {
  room: RoomWithUsers;
};

export type JoinRoomApiResponse = {
  room: RoomWithUsers;
};

export type LeaveRoomApiResponse = {
  left: boolean;
};
