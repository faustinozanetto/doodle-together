import {
  OnGatewayInit,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { DrawPointDto } from './dto/draw-point.dto';
import { SocketWithAuth } from './types';

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

    const { updatedRoom } = await this.roomsService.addUserToRoom({ roomId, userId, username });

    this.io.to(roomId).emit('room_updated', { updatedRoom });
  }

  async handleDisconnect(client: SocketWithAuth) {
    const { roomId, userId } = client;
    const sockets = this.io.sockets;

    const { updatedRoom } = await this.roomsService.removeUserFromRoom({ roomId, userId });

    const clientCount = this.io.adapter.rooms?.get(roomId)?.size ?? 0;

    this.logger.log(`Disconnected socket id: ${client.id}`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);
    this.logger.debug(`Total clients connected to roomId '${roomId}': ${clientCount}`);

    if (updatedRoom) {
      this.io.to(roomId).emit('room_updated', { updatedRoom });
    }
  }

  @SubscribeMessage('draw_point')
  async drawPoint(@MessageBody() data: DrawPointDto, @ConnectedSocket() client: Socket): Promise<void> {
    const { roomId, point } = data;

    this.logger.log(`Room draw point with id: ${data.roomId} and point ${JSON.stringify(data.point)}`);

    this.io.to(roomId).emit('update_canvas', { point });
  }
}
