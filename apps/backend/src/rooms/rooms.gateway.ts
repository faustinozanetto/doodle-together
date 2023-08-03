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
  KickUserSocketPayload,
  RequestCanvasStateSocketPayload,
  SendCanvasStateSocketPayload,
  SendNotificationSocketPayload,
  UpdateRoomSocketPayload,
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

    const { room } = await this.roomsService.addUserToRoom({
      roomId,
      userId,
      username,
      socketId,
    });

    this.logger.log(`USER CONNECTED ${userId}, ${username}`);

    const notificationPayload: SendNotificationSocketPayload = {
      type: 'user-joined',
      content: `User ${username} joined the room!`,
      userId,
      broadcast: 'except',
    };

    this.io.to(roomId).emit('send_notification', notificationPayload);

    const updateRoomPayload: UpdateRoomSocketPayload = {
      room,
    };

    this.io.to(roomId).emit('update_room', updateRoomPayload);
  }

  /**
   * Function responsible for the disconnection of a socket client
   * @param client Socket data with auth details
   */
  async handleDisconnect(client: SocketWithAuth) {
    const { roomId, userId, username } = client;

    await client.leave(roomId);

    const { room } = await this.roomsService.removeUserFromRoom({ roomId, userId });

    this.logger.log(`USER DISCONNECTED ${userId}, ${username}`);

    const users: UserWithSocketId[] = [];
    for (const user in room.users) {
      users.push({ userId: user, username: room.users[user].username, socketId: room.users[user].socketId });
    }

    const notificationPayload: SendNotificationSocketPayload = {
      type: 'user-left',
      content: `User ${username} left the room!`,
      userId,

      broadcast: 'except',
    };

    this.io.to(roomId).emit('send_notification', notificationPayload);

    const updateRoomPayload: UpdateRoomSocketPayload = {
      room,
    };

    this.io.to(roomId).emit('update_room', updateRoomPayload);
  }

  @SubscribeMessage('kick_user')
  async kickUser(@MessageBody() data: KickUserSocketPayload): Promise<void> {
    const { roomId, userId } = data;

    const { room } = await this.roomsService.findRoom({
      roomId,
    });

    const users: UserWithSocketId[] = [];
    for (const user in room.users) {
      users.push({ userId: user, username: room.users[user].username, socketId: room.users[user].socketId });
    }

    const targetUser = room.users[userId];
    if (!targetUser) return;

    const targetUserSocketId = targetUser.socketId;

    const exceptNotificationPayload: SendNotificationSocketPayload = {
      type: 'user-kicked-except',
      content: `User ${targetUser.username} has been kicked!`,
      userId,
      broadcast: 'except',
    };

    this.io.to(roomId).emit('send_notification', exceptNotificationPayload);

    const selfNotificationPayload: SendNotificationSocketPayload = {
      type: 'user-kicked-self',
      content: `You have been kicked from the room!`,
      userId,
      broadcast: 'self',
    };

    this.io.to(targetUserSocketId).emit('send_notification', selfNotificationPayload);

    this.io.to(targetUserSocketId).emit('kick_request');
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

    this.logger.log({ users });
    if (users.length === 0) return;

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

    const payload: DispatchCanvasStateSocketPayload = {
      canvasState,
    };

    const userSocketId = room.users[userId].socketId;
    this.io.to(userSocketId).emit('dispatch_canvas_state', payload);
  }

  @SubscribeMessage('canvas_cleared')
  async canvasCleared(@MessageBody() data: CanvasClearedSocketPayload): Promise<void> {
    const { roomId } = data;

    this.io.to(roomId).emit('clear_canvas');
  }
}
