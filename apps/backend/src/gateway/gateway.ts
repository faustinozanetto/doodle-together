import { Inject, Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  MessageBody,
  SubscribeMessage,
  ConnectedSocket,
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
  SendCanvasStateSocketPayload,
  CanvasClearedSocketPayload,
  SendNotificationSocketPayload,
  UpdateRoomSocketPayload,
  GetCanvasStateSocketPayload,
  DispatchCanvasStateSocketPayload,
  KickUserSocketPayload,
  DrawEraserSocketPayload,
} from '@doodle-together/shared';
import { IUsersService } from 'src/users/interfaces/users-service.interface';
import { IGatewayRoomsManager } from './interfaces/gateway-rooms-manager.interface';

@WebSocketGateway({
  namespace: 'rooms',
})
export class ServerGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ServerGateway.name);

  constructor(
    @Inject(Services.GATEWAY_SESSION_MANAGER) readonly sessionManager: IGatewaySessionManager,
    @Inject(Services.GATEWAY_ROOMS_MANAGER) readonly roomsManager: IGatewayRoomsManager,
    @Inject(Services.ROOMS_SERVICE) private readonly roomsService: IRoomsService,
    @Inject(Services.USERS_SERVICE) private readonly usersService: IUsersService
  ) {}

  @WebSocketServer()
  server: Server;

  afterInit() {
    this.logger.log('Server Gateway initialized successfully!');
  }

  async handleConnection(socket: SocketWithAuth) {
    const { id, roomId, userId, username } = socket;

    this.logger.log(`Connection established to socketId: ${id} and username: ${username}`);
    this.sessionManager.addUserToSessions(userId, { socketId: id, username });

    await socket.join(roomId);
  }

  async handleDisconnect(socket: SocketWithAuth) {
    const { id, roomId, userId, username } = socket;
    this.logger.log(`Connection terminated from socketId: ${id}`);
    this.sessionManager.removeUserFromSessions(userId);

    await socket.leave(roomId);

    const roomIsDeleted = this.roomsManager.getRoom(roomId);

    // If room was marked as deleted do not remove user and emit notification. That will be handled by the client socket listenting room_deleted using the leave endpoint
    if (roomIsDeleted && roomIsDeleted.isDeleted) {
      return;
    }

    const notificationPayload: SendNotificationSocketPayload = {
      type: 'user-left',
      content: `User ${username} left the room!`,
      userId,

      broadcast: 'except',
    };

    this.server.to(roomId).emit(SocketNames.SEND_NOTIFICATION, notificationPayload);

    const { room } = await this.roomsService.removeUserFromRoom({ roomId, userId });

    const updateRoomPayload: UpdateRoomSocketPayload = {
      room,
    };

    this.server.to(roomId).emit(SocketNames.UPDATE_ROOM, updateRoomPayload);
  }

  /* Room Gateway Section */
  @SubscribeMessage(SocketNames.USER_JOINED)
  async userJoined(@ConnectedSocket() socket: SocketWithAuth) {
    const { userId, username, roomId, id } = socket;

    this.logger.log('User Joined: ' + JSON.stringify({ userId, username, roomId, id }));

    const notificationPayload: SendNotificationSocketPayload = {
      type: 'user-joined',
      content: `User ${username} joined the room!`,
      userId,
      broadcast: 'except',
    };

    this.server.to(roomId).emit(SocketNames.SEND_NOTIFICATION, notificationPayload);

    const { room } = await this.roomsService.addUserToRoom({ roomId, userId });

    const updateRoomPayload: UpdateRoomSocketPayload = {
      room,
    };

    this.server.to(roomId).emit(SocketNames.UPDATE_ROOM, updateRoomPayload);
  }

  @SubscribeMessage(SocketNames.KICK_USER)
  async kickUser(@MessageBody() data: KickUserSocketPayload): Promise<void> {
    const { roomId, userId } = data;

    const { room } = await this.roomsService.findRoom({
      roomId,
    });

    const userExists = room.users.findIndex((user) => user.id === userId);
    if (userExists === -1) return;

    const { user } = await this.usersService.findUser({ userId });

    const exceptNotificationPayload: SendNotificationSocketPayload = {
      type: 'user-kicked-except',
      content: `User ${user.username} has been kicked!`,
      userId,
      broadcast: 'except',
    };

    this.server.to(roomId).emit(SocketNames.SEND_NOTIFICATION, exceptNotificationPayload);

    const selfNotificationPayload: SendNotificationSocketPayload = {
      type: 'user-kicked-self',
      content: `You have been kicked from the room!`,
      userId,
      broadcast: 'self',
    };

    const targetUser = this.sessionManager.getUserSession(userId);
    if (!targetUser) return;

    this.server.to(targetUser.socketId).emit(SocketNames.SEND_NOTIFICATION, selfNotificationPayload);
    this.server.to(targetUser.socketId).emit(SocketNames.KICK_REQUEST);
  }

  @SubscribeMessage(SocketNames.DRAW_POINT)
  async drawPoint(@MessageBody() data: DrawPointSocketPayload): Promise<void> {
    const { roomId, data: pointData } = data;

    const updateCanvasStatePayload: UpdateCanvasStateSocketPayload = {
      data: pointData,
      tool: 'pencil',
    };

    this.server.to(roomId).emit(SocketNames.UPDATE_CANVAS_STATE, updateCanvasStatePayload);
  }

  @SubscribeMessage(SocketNames.DRAW_ERASER)
  async drawEraser(@MessageBody() data: DrawEraserSocketPayload): Promise<void> {
    const { roomId, data: eraserData } = data;

    const updateCanvasStatePayload: UpdateCanvasStateSocketPayload = {
      data: eraserData,
      tool: 'eraser',
    };

    this.server.to(roomId).emit(SocketNames.UPDATE_CANVAS_STATE, updateCanvasStatePayload);
  }

  @SubscribeMessage(SocketNames.REQUEST_CANVAS_STATE)
  async requestCanvasState(@MessageBody() data: RequestCanvasStateSocketPayload): Promise<void> {
    const { roomId, userId } = data;

    const payload: GetCanvasStateSocketPayload = {
      userId,
    };

    const { room } = await this.roomsService.findRoom({
      roomId,
    });

    // If there are no more users than the requestor return.
    if (!room || room.users.length === 0) return;

    // Sort by owner priority
    const sortedUsers = room.users.sort((user) => {
      if (user.id === room.ownerId) return -1;
      return 1;
    });

    const highestPriorityUser = sortedUsers[0];
    const targetUser = this.sessionManager.getUserSession(highestPriorityUser.id);
    if (!targetUser) return;

    this.server.to(targetUser.socketId).emit(SocketNames.GET_CANVAS_STATE, payload);
  }

  @SubscribeMessage(SocketNames.SEND_CANVAS_STATE)
  async sendCanvasState(@MessageBody() data: SendCanvasStateSocketPayload): Promise<void> {
    const { canvasState, userId } = data;

    const payload: DispatchCanvasStateSocketPayload = {
      canvasState,
    };

    const userSession = this.sessionManager.getUserSession(userId);
    if (!userSession) return;

    this.server.to(userSession.socketId).emit(SocketNames.DISPATCH_CANVAS_STATE, payload);
  }

  @SubscribeMessage(SocketNames.CANVAS_CLEARED)
  async canvasCleared(@MessageBody() data: CanvasClearedSocketPayload): Promise<void> {
    const { roomId } = data;

    this.server.to(roomId).emit(SocketNames.CLEAR_CANVAS);
  }
}
