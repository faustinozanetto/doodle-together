export type CanvasPoint = {
  x: number;
  y: number;
};

export type JoinRoomSocketData = { roomId: string; username: string };

export type RoomJoinedSocketData = { roomId: string; userId: string; username: string };

export type DrawPointSocketData = { roomId: string; point: CanvasPoint };

export type UpdateCanvasSocketData = {
  point: CanvasPoint;
};
