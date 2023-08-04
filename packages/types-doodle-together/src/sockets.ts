import { Room, User } from '.';

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
  canvasState: string;
  roomId: Room['roomId'];
  userId: User['userId'];
};

export type DispatchCanvasStateSocketPayload = {
  canvasState: string;
};

export type UpdateRoomSocketPayload = {
  room: Room;
};

export type KickUserSocketPayload = {
  roomId: string;
  userId: string;
};

export type SocketNotificationType = 'user-joined' | 'user-left' | 'user-kicked-self' | 'user-kicked-except';

export type SocketNotifcationBroadcastType = 'self' | 'all' | 'except';

export type SendNotificationSocketPayload = {
  broadcast: SocketNotifcationBroadcastType;
  content: string;
  type: SocketNotificationType;
  userId: string;
};
