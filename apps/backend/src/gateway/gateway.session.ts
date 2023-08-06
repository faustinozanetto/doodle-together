import { Injectable, Logger } from '@nestjs/common';
import { SocketWithAuth } from 'src/rooms/types';
import { IGatewaySessionManager } from './interfaces/gateway-session-manager.interface';

@Injectable()
export class GatewaySessionManager implements IGatewaySessionManager {
  private readonly logger = new Logger(GatewaySessionManager.name);
  private sessions: Map<string, SocketWithAuth>;

  constructor() {
    this.sessions = new Map();
    this.logger.log('Sessions Map has been initialized!');
  }

  addUserToSessions(socketId: string, user: SocketWithAuth) {
    this.sessions.set(socketId, user);
    this.logger.log(`User added to session with sockedId: ${socketId} and userId: ${user.userId}!`);
  }

  removeUserFromSessions(socketId: string) {
    this.sessions.delete(socketId);
    this.logger.log(`User removed from session with sockedId: ${socketId}!`);
  }

  getUserSession(socketId: string) {
    return this.sessions.get(socketId);
  }

  getSessions() {
    return this.sessions;
  }
}
