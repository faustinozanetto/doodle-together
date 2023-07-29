import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomJoinDto } from './dto/room-join.dto';
import { RoomLeaveDto } from './dto/room-leave.dto';
import { Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@UsePipes(new ValidationPipe())
@WebSocketGateway({
  namespace: 'rooms',
})
export class RoomsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(RoomsGateway.name);
  constructor(private readonly roomsService: RoomsService) {}

  @WebSocketServer() server: Server;

  afterInit(server: Socket) {
    this.logger.log('Room Gateway initialized successfully!');
  }

  handleConnection(client: Socket) {
    this.logger.log(`WS Client with id: ${client.id} connected!`);
  }

  handleDisconnect(client: Socket) {
    console.log('Room Gateway client disonnected! ID: ' + client.id);
  }

  @SubscribeMessage('room_join')
  handleJoinRoom(@MessageBody() data: RoomJoinDto) {
    console.log({ data });
  }

  @SubscribeMessage('room_leave')
  handleLeaveRoom(@MessageBody() data: RoomLeaveDto) {
    console.log({ data });
  }
}
