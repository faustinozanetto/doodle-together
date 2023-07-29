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
import { JoinRoomDto } from './dto/join-room.dto';

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

  async handleConnection(client: Socket) {
    const sockets = this.io.sockets;

    this.logger.log(`WS Client with id: ${client.id} connected!`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);
  }

  async handleDisconnect(client: Socket) {
    const sockets = this.io.sockets;

    this.logger.log(`Disconnected socket id: ${client.id}`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);
  }

  @SubscribeMessage('join_room')
  async joinRoom(@MessageBody() data: JoinRoomDto, @ConnectedSocket() client: Socket): Promise<void> {
    const { roomId, username } = data;

    const join = await this.roomsService.joinRoom({ roomId, username });

    await client.join(roomId);

    this.logger.debug(`User : ${join.userId} joined room with id: ${roomId}`);
  }
}
