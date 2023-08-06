import { SocketWithAuth } from 'src/rooms/types';

export interface IGatewaySessionManager {
  addUserToSessions(socketId: string, user: SocketWithAuth);
  removeUserFromSessions(socketId: string);
  getUserSession(socketId: string): SocketWithAuth;
  getSessions(): Map<string, SocketWithAuth>;
}
