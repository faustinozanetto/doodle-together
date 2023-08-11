import { Room, User } from '@doodle-together/database';
import { CanvasPoint, RoomToolSize, RoomWithUsers } from '.';

export type CanvasClearedSocketPayload = {
  roomId: Room['id'];
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

export type DrawPointSocketPayload = {
  data: {
    color: string;
    point: CanvasPoint;
    prevPoint: CanvasPoint | null;
    size: RoomToolSize;
  };
  roomId: string;
};

export type DrawEraserSocketPayload = {
  data: {
    point: CanvasPoint;
    prevPoint: CanvasPoint | null;
  };
  roomId: string;
};

export type UpdateCanvasStateSocketPayload =
  | {
      data: DrawPointSocketPayload['data'];
      tool: 'pencil';
    }
  | {
      data: DrawEraserSocketPayload['data'];
      tool: 'eraser';
    };
