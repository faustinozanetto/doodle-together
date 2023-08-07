import { SocketNames } from '@doodle-together/shared';
import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ServerGateway } from 'src/gateway/gateway';
import { Events } from 'src/utils/constants';

@Injectable()
export class RoomListenerEvents {
  constructor(@Inject(ServerGateway) private readonly gateway: ServerGateway) {}

  @OnEvent(Events.ROOM_DELETE_EVENT)
  friendRequestCreate(payload) {
    this.gateway.server.to(payload.roomId).emit(SocketNames.DELETE_ROOM);
  }
}
