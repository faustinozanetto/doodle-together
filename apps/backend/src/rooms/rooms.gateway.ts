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
import {
  CanvasClearedSocketPayload,
  DispatchCanvasStateSocketPayload,
  GetCanvasStateSocketPayload,
  RequestCanvasStateSocketPayload,
  SendCanvasStateSocketPayload,
  UserWithSocketId,
} from '@doodle-together/types';

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

    await client.join(roomId);
    const socketId = client.id;

    const { room, user } = await this.roomsService.addUserToRoom({
      roomId,
      userId,
      username,
      socketId,
    });

    this.io.to(roomId).emit('user_joined', { room, user });
  }

  /**
   * Function responsible for the disconnection of a socket client
   * @param client Socket data with auth details
   */
  async handleDisconnect(client: SocketWithAuth) {
    const { roomId, userId, username } = client;

    await client.leave(roomId);

    const { room } = await this.roomsService.removeUserFromRoom({ roomId, userId });

    const users: UserWithSocketId[] = [];
    for (const user in room.users) {
      users.push({ userId: user, username: room.users[user].username, socketId: room.users[user].socketId });
    }

    // If user that left was the owner and room was empty after leave, delete it.
    if (userId === room.ownerId && users.length === 0) {
      this.io.to(roomId).emit('room_deleted');
      return;
    }

    this.io.to(roomId).emit('user_left', { room, user: { userId, username } });
  }

  @SubscribeMessage('draw_point')
  async drawPoint(@MessageBody() data: DrawPointDto): Promise<void> {
    const { roomId, point } = data;

    this.io.to(roomId).emit('update_canvas_state', { point });
  }

  @SubscribeMessage('request_canvas_state')
  async requestCanvasState(@MessageBody() data: RequestCanvasStateSocketPayload): Promise<void> {
    const { roomId, userId } = data;

    const payload: GetCanvasStateSocketPayload = {
      userId,
    };

    const { room } = await this.roomsService.findRoom({
      roomId,
    });

    const users: UserWithSocketId[] = [];
    for (const user in room.users) {
      users.push({ userId: user, username: room.users[user].username, socketId: room.users[user].socketId });
    }

    // If there are no more users than the user return
    if (users.length <= 1) return;

    // Sort by owner priority
    const sortedUsers = users.sort((user) => {
      if (user.userId === room.ownerId) return -1;
      return 1;
    });

    const targetUserSocketId = sortedUsers[0].socketId;
    this.io.to(targetUserSocketId).emit('get_canvas_state', payload);
  }

  @SubscribeMessage('send_canvas_state')
  async sendCanvasState(@MessageBody() data: SendCanvasStateSocketPayload): Promise<void> {
    const { canvasState, userId, roomId } = data;

    const { room } = await this.roomsService.findRoom({
      roomId,
    });

    const userSocketId = room.users[userId].socketId;

    const payload: DispatchCanvasStateSocketPayload = {
      canvasState,
    };

    this.io.to(userSocketId).emit('dispatch_canvas_state', payload);
  }

  @SubscribeMessage('canvas_cleared')
  async canvasCleared(@MessageBody() data: CanvasClearedSocketPayload): Promise<void> {
    const { roomId } = data;

    this.io.to(roomId).emit('clear_canvas');
  }
}
