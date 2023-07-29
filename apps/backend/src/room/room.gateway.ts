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

@WebSocketGateway(81, {
  cors: {
    origin: 'http://localhost:3000',
  },
})
export class RoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  afterInit(server: Socket) {
    console.log('Room Gateway initialized successfully!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('Room Gateway client connected! ID: ' + client.id);
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
