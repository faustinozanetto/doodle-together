import { Injectable, Logger } from '@nestjs/common';
import { RoomsRepository } from './rooms.repository';
import { CreateRoomInputFields } from './types';
import { DeleteRoomDto } from './dto/delete-room.dto';
import { JoinRoomDto } from './dto/join-room.dto';

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);
  constructor(private readonly roomsRepository: RoomsRepository) {}

  async createRoom(input: CreateRoomInputFields) {
    const room = await this.roomsRepository.createRoom({
      roomId: input.roomId,
    });

    return { room };
  }

  async deleteRoom(input: DeleteRoomDto) {
    const deleted = await this.roomsRepository.deleteRoom(input);
    return deleted;
  }

  async joinRoom(input: JoinRoomDto) {
    const joined = await this.roomsRepository.addUseToRoom(input);
  }
}
