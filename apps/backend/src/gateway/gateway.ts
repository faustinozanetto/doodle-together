import { Inject, Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketWithAuth } from 'src/rooms/types';
import { Services } from 'src/utils/constants';

import { IGatewaySessionManager } from './interfaces/gateway-session-manager.interface';

import { IRoomsService } from 'src/rooms/interfaces/rooms-service.interface';
import {
  SocketNames,
  DrawPointSocketPayload,
  UpdateCanvasStateSocketPayload,
  RequestCanvasStateSocketPayload,
  GetCanvasStateSocketPayload,
  SendCanvasStateSocketPayload,
  DispatchCanvasStateSocketPayload,
  CanvasClearedSocketPayload,
  SendNotificationSocketPayload,
  UpdateRoomSocketPayload,
} from '@doodle-together/shared';

@WebSocketGateway({
  namespace: 'rooms',
})
export class ServerGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ServerGateway.name);

  constructor(
    @Inject(Services.GATEWAY_SESSION_MANAGER) readonly sessionManager: IGatewaySessionManager,
    @Inject(Services.ROOMS_SERVICE) private readonly roomsService: IRoomsService
  ) {}

  @WebSocketServer()
  server: Server;

  afterInit() {
    this.logger.log('Server Gateway initialized successfully!');
  }

  async handleConnection(socket: SocketWithAuth) {
    const socketId = socket.id;
    this.logger.log(`Connection established to socketId: ${socketId}`);
    this.sessionManager.addUserToSessions(socketId, socket);

    const { roomId, userId } = socket;

    await socket.join(roomId);

    const { room, user } = await this.roomsService.addUserToRoom({ roomId, userId });

    const notificationPayload: SendNotificationSocketPayload = {
      type: 'user-joined',
      content: `User ${user.username} joined the room!`,
      userId,
      broadcast: 'except',
    };

    this.server.to(roomId).emit(SocketNames.SEND_NOTIFICATION, notificationPayload);

    const updateRoomPayload: UpdateRoomSocketPayload = {
      room,
    };

    this.server.to(roomId).emit(SocketNames.UPDATE_ROOM, updateRoomPayload);
  }

  async handleDisconnect(socket: SocketWithAuth) {
    const socketId = socket.id;
    this.logger.log(`Connection terminated from socketId: ${socketId}`);
    this.sessionManager.removeUserFromSessions(socketId);

    /*
    const { roomId, user } = socket;
    const { userId, username } = user;

    await socket.leave(roomId);

    const { room } = await this.roomsService.removeUserFromRoom({ roomId, userId });

    const notificationPayload: SendNotificationSocketPayload = {
      type: 'user-left',
      content: `User ${username} left the room!`,
      userId,

      broadcast: 'except',
    };

    this.server.to(roomId).emit(SocketNames.SEND_NOTIFICATION, notificationPayload);

    const updateRoomPayload: UpdateRoomSocketPayload = {
      room,
    };

    this.server.to(roomId).emit(SocketNames.UPDATE_ROOM, updateRoomPayload);
    */
  }

  /* Room Gateway Section */
  @SubscribeMessage(SocketNames.DRAW_POINT)
  async drawPoint(@MessageBody() data: DrawPointSocketPayload): Promise<void> {
    const { roomId, point } = data;

    const updateCanvasStatePayload: UpdateCanvasStateSocketPayload = {
      point,
    };

    this.server.to(roomId).emit(SocketNames.UPDATE_CANVAS_STATE, updateCanvasStatePayload);
  }

  @SubscribeMessage(SocketNames.REQUEST_CANVAS_STATE)
  async requestCanvasState(@MessageBody() data: RequestCanvasStateSocketPayload): Promise<void> {
    const { roomId, userId } = data;

    /*
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

    if (users.length === 0) return;

    // Sort by owner priority
    const sortedUsers = users.sort((user) => {
      if (user.userId === room.ownerId) return -1;
      return 1;
    });

    const targetUserSocketId = sortedUsers[0].socketId;
    this.server.to(targetUserSocketId).emit(SocketNames.GET_CANVAS_STATE, payload);
    */
  }

  @SubscribeMessage(SocketNames.SEND_CANVAS_STATE)
  async sendCanvasState(@MessageBody() data: SendCanvasStateSocketPayload): Promise<void> {
    const { canvasState, userId, roomId } = data;

    /*
    const { room } = await this.roomsService.findRoom({
      roomId,
    });

    const payload: DispatchCanvasStateSocketPayload = {
      canvasState,
    };

    const userSocketId = room.users[userId].socketId;
    this.server.to(userSocketId).emit(SocketNames.DISPATCH_CANVAS_STATE, payload);
    */
  }

  @SubscribeMessage(SocketNames.CANVAS_CLEARED)
  async canvasCleared(@MessageBody() data: CanvasClearedSocketPayload): Promise<void> {
    const { roomId } = data;

    this.server.to(roomId).emit(SocketNames.CLEAR_CANVAS);
  }
}
