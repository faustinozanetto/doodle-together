export interface GatewaySessionUser {
  socketId: string;
  username: string;
}

export interface IGatewaySessionManager {
  addUserToSessions(userId: string, user: GatewaySessionUser);
  removeUserFromSessions(userId: string);
  getUserSession(userId: string): GatewaySessionUser | null;
  getSessions(): Map<string, GatewaySessionUser>;
}
