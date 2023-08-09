import { Injectable, Logger } from '@nestjs/common';
import { GatewayRoom, IGatewayRoomsManager } from './interfaces/gateway-rooms-manager.interface';

@Injectable()
export class GatewayRoomsManager implements IGatewayRoomsManager {
  private readonly logger = new Logger(GatewayRoomsManager.name);
  private rooms: Map<string, GatewayRoom>;

  constructor() {
    this.rooms = new Map();
    this.logger.log('Rooms Map has been initialized!');
  }

  addRoomToManager(roomId: string, room: GatewayRoom) {
    this.rooms.set(roomId, room);
    this.logger.log(`Room added to gateway with roomId: ${roomId}`);
  }

  removeRoomFromManager(roomId: string) {
    this.rooms.delete(roomId);
    this.logger.log(`Room removed from gateway with roomId: ${roomId}!`);
  }

  updateRoom(roomId: string, room: GatewayRoom) {
    this.rooms.set(roomId, room);
  }

  getRoom(roomId: string) {
    return this.rooms.get(roomId) ?? null;
  }

  getRooms() {
    return this.rooms;
  }
}
