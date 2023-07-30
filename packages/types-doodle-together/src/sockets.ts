import { Room, User } from '.';

export type UserJoinedSocketPayload = {
  roomId: Room['roomId'];
  user: User;
};

export type UserLeftSocketPayload = {
  roomId: Room['roomId'];
  user: User;
};
