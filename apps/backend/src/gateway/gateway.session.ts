import { Injectable, Logger } from '@nestjs/common';
import { SocketWithAuth } from 'src/rooms/types';
import { IGatewaySessionManager } from './interfaces/gateway-session-manager.interface';

@Injectable()
export class GatewaySessionManager implements IGatewaySessionManager {
  private readonly logger = new Logger(GatewaySessionManager.name);
  private sessions: Map<string, SocketWithAuth> = new Map();

  addUserToSessions(socketId: string, user: SocketWithAuth) {
    this.sessions.set(socketId, user);
  }

  removeUserFromSessions(socketId: string) {
    this.sessions.delete(socketId);
  }

  getUserSession(socketId: string) {
    return this.sessions.get(socketId);
  }

  getSessions() {
    return this.sessions;
  }
}
