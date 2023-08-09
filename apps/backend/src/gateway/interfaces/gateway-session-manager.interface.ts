export interface GatewaySessionUser {
  /** User socket id */
  socketId: string;
  /** User username */
  username: string;
}

export interface IGatewaySessionManager {
  /**
   * Adds a user to the manager
   * @param userId User id
   * @param user User data
   */
  addUserToSessions(userId: string, user: GatewaySessionUser);
  /**
   * Removes a user from the manager
   * @param userId User id
   */
  removeUserFromSessions(userId: string);
  /**
   * Gets a user from the manager
   * @param userId User id
   */
  getUserSession(userId: string): GatewaySessionUser | null;
  /**
   * Gets all the users from the manager
   */
  getSessions(): Map<string, GatewaySessionUser>;
}
