export * from './sockets';

export type Room = {
  roomId: string;
  ownerId: string;
  password: string;
  users: RoomUsers;
};

export type RoomUsers = {
  [userId: string]: string;
};

export type User = {
  userId: string;
  username: string;
};

export type CanvasPoint = {
  x: number;
  y: number;
};
