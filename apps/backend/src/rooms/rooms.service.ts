import { Injectable, Logger } from '@nestjs/common';
import { RoomsRepository } from './rooms.repository';
import { CreateRoomInputFields } from './types';

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
}
