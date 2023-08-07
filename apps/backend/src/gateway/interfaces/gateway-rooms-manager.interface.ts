export interface GatewayRoom {
  /** Is the room marked as deleted?. Used when owner deletes room to let know users that has been deleted. */
  isDeleted: boolean;
}

export interface IGatewayRoomsManager {
  /**
   * Adds a room to the manager
   * @param roomId Room id
   * @param room Room data
   */
  addRoomToManager(roomId: string, room: GatewayRoom);
  /**
   * Removes a room from the manager
   * @param roomId Room id
   */
  removeRoomFromManager(roomId: string);
  /**
   * Updates a room from the manager
   * @param roomId Room id
   * @param room Room data
   */
  updateRoom(roomId: string, room: GatewayRoom);
  /**
   * Gets the data of a room
   * @param roomId Room id
   */
  getRoom(roomId: string): GatewayRoom | null;
  /**
   * Gets all the rooms in the manager
   */
  getRooms(): Map<string, GatewayRoom>;
}
