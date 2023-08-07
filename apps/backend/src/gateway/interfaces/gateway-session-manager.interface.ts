export interface GatewaySessionUser {
  socketId: string;
}

export interface IGatewaySessionManager {
  addUserToSessions(userId: string, user: GatewaySessionUser);
  removeUserFromSessions(userId: string);
  getUserSession(userId: string): GatewaySessionUser;
  getSessions(): Map<string, GatewaySessionUser>;
}
