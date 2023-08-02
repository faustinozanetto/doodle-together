import {
  OnGatewayInit,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { DrawPointDto } from './dto/draw-point.dto';
import { SocketWithAuth } from './types';
import { CanvasClearedSocketPayload } from '@doodle-together/types';

@UsePipes(new ValidationPipe())
@WebSocketGateway({
  namespace: 'rooms',
})
export class RoomsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(RoomsGateway.name);

  constructor(private readonly roomsService: RoomsService) {}

  @WebSocketServer() io: Namespace;

  afterInit() {
    this.logger.log('Room Gateway initialized successfully!');
  }

  /**
   * Function responsible for the connection of a socket client
   * @param client Socket data with auth details
   */
  async handleConnection(client: SocketWithAuth) {
    const { roomId, userId, username } = client;

    const sockets = this.io.sockets;

    this.logger.debug(`Socket connected with userId: ${userId}, roomId: ${roomId}, and username: "${username}"`);

    this.logger.log(`WS Client with id: ${client.id} connected!`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);

    await client.join(roomId);

    const connectedClients = this.io.adapter.rooms?.get(roomId)?.size ?? 0;

    this.logger.debug(`userID: ${userId} joined roomId: ${roomId}`);
    this.logger.debug(`Total clients connected to roomId '${roomId}': ${connectedClients}`);

    const { room, user } = await this.roomsService.addUserToRoom({
      roomId,
      userId,
      username,
    });

    this.logger.log('User Joined room: ' + JSON.stringify(room) + ' user: ' + JSON.stringify(user));

    this.io.to(roomId).emit('user_joined', { room, user });
  }

  /**
   * Function responsible for the disconnection of a socket client
   * @param client Socket data with auth details
   */
  async handleDisconnect(client: SocketWithAuth) {
    const { roomId, userId, username } = client;
    const sockets = this.io.sockets;

    const clientCount = this.io.adapter.rooms?.get(roomId)?.size ?? 0;

    await client.leave(roomId);

    this.logger.log(`Disconnected socket id: ${client.id}`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);
    this.logger.debug(`Total clients connected to roomId '${roomId}': ${clientCount}`);

    const { room } = await this.roomsService.removeUserFromRoom({ roomId, userId });

    this.io.to(roomId).emit('user_left', { room, user: { userId, username } });
    /*
    // User that left was not the owner of the room
    if (userId !== room.ownerId) return this.io.to(roomId).emit('user_left', { room, user: { userId, username } });

    // Handle user left was room owner
    const { deleted } = await this.roomsService.deleteRoom({
      roomId,
    });

    if (!deleted) return;

    this.io.to(roomId).emit('room_deleted', { room });
    */
  }

  @SubscribeMessage('draw_point')
  async drawPoint(@MessageBody() data: DrawPointDto): Promise<void> {
    const { roomId, point } = data;

    this.io.to(roomId).emit('update_canvas_state', { point });
  }

  @SubscribeMessage('canvas_cleared')
  async canvasCleared(@MessageBody() data: CanvasClearedSocketPayload): Promise<void> {
    const { roomId } = data;

    this.io.to(roomId).emit('clear_canvas');
  }
}
