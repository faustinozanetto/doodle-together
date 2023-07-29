import { Socket } from 'socket.io';

export type AuthData = {
  userId: string;
  roomId: string;
  username: string;
};

export type SocketWithAuth = Socket & AuthData;
