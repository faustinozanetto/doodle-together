export type Room = {
  roomId: string;
  ownerId: string;
  password: string;
  users: RoomUsers;
};

export type RoomUsers = {
  [userId: string]: { username: string; socketId: string };
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
