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

export type RequestCanvasStateSocketPayload = {
  roomId: Room['roomId'];
  userId: User['userId'];
};

export type GetCanvasStateSocketPayload = {
  userId: User['userId'];
};

export type SendCanvasStateSocketPayload = {
  roomId: Room['roomId'];
  userId: User['userId'];
  canvasState: string;
};

export type DispatchCanvasStateSocketPayload = {
  canvasState: string;
};

export type KickUserSocketPayload = {
  userId: string;
  roomId: string;
};
