import { Socket } from 'socket.io';
import { Request } from 'express';

export type AuthData = {
  userId: string;
  roomId: string;
  username: string;
};

export type SocketWithAuth = Socket & AuthData;
export type RequestWithAuth = Request & AuthData;
