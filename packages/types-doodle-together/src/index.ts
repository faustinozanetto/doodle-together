export type Room = {
  roomId: string;
  users: User[];
};

export type User = {
  userId: string;
  username: string;
};

export type CanvasPoint = {
  x: number;
  y: number;
};
