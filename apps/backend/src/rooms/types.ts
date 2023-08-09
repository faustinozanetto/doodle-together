import { Socket } from 'socket.io';
import { Request } from 'express';

export interface SocketWithAuth extends Socket {
  userId: string;
  roomId: string;
  username: string;
}
export interface RequestWithAuth extends Request {
  userId: string;
  roomId: string;
  username: string;
}
