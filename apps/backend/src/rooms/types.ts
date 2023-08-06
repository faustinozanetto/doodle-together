import { Socket } from 'socket.io';
import { Request } from 'express';
import { User } from '@doodle-together/shared';

export type SocketAuthData = {
  user: User;
  roomId: string;
};

export type SocketWithAuth = Socket & SocketAuthData;
export type RequestWithAuth = Request & SocketAuthData;
