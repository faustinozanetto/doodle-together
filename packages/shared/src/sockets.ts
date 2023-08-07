import { Room, User } from '@doodle-together/database';
import { CanvasPoint, RoomWithUsers } from '.';

export type DrawPointSocketPayload = {
  point: { color: string; point: CanvasPoint; prevPoint: CanvasPoint | null; size: string };
  roomId: string;
};

export type UserJoinedSocketPayload = {};
export type UserLeftSocketPayload = {};

export type CanvasClearedSocketPayload = {
  roomId: Room['id'];
};

export type UpdateCanvasStateSocketPayload = {
  point: DrawPointSocketPayload['point'];
};

export type RequestCanvasStateSocketPayload = {
  roomId: Room['id'];
  userId: User['id'];
};

export type GetCanvasStateSocketPayload = {
  userId: User['id'];
};

export type SendCanvasStateSocketPayload = {
  canvasState: string;
  userId: User['id'];
};

export type DispatchCanvasStateSocketPayload = {
  canvasState: string;
};

export type UpdateRoomSocketPayload = {
  room: RoomWithUsers;
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
