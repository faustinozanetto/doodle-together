export type Room = {
  ownerId: string;
  password: string;
  roomId: string;
  users: RoomUsers;
};

export type RoomUsers = {
  [userId: string]: { socketId: string; username: string };
};

export type User = {
  userId: string;
  username: string;
};

export type UserWithSocketId = User & {
  socketId: string;
};

export type CanvasPoint = {
  x: number;
  y: number;
};
