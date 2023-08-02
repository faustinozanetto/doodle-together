import { Room, User } from '.';

export type UserJoinedSocketPayload = {
  room: Room;
  user: User;
};

export type UserLeftSocketPayload = {
  room: Room;
  user: User;
};

export type CanvasClearedSocketPayload = {
  roomId: Room['roomId'];
};
