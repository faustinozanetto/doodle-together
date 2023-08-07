import { Injectable, Logger } from '@nestjs/common';
import { GatewaySessionUser, IGatewaySessionManager } from './interfaces/gateway-session-manager.interface';

@Injectable()
export class GatewaySessionManager implements IGatewaySessionManager {
  private readonly logger = new Logger(GatewaySessionManager.name);
  private sessions: Map<string, GatewaySessionUser>;

  constructor() {
    this.sessions = new Map();
    this.logger.log('Sessions Map has been initialized!');
  }

  addUserToSessions(userId: string, user: GatewaySessionUser) {
    this.sessions.set(userId, user);
    this.logger.log(`User added to session with userId: ${userId} and socketId: ${user.socketId}!`);
  }

  removeUserFromSessions(userId: string) {
    this.sessions.delete(userId);
    this.logger.log(`User removed from session with userId: ${userId}!`);
  }

  getUserSession(userId: string) {
    return this.sessions.get(userId);
  }

  getSessions() {
    return this.sessions;
  }
}
