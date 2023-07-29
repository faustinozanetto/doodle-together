import { Injectable, Logger } from '@nestjs/common';
import { RoomsRepository } from './rooms.repository';
import { CreateRoomInputFields } from './types';
import { DeleteRoomDto } from './dto/delete-room.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { generateUserId } from 'src/utils/utils';

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
    const { roomId, username } = input;
    const userId = generateUserId();

    this.logger.log({ userId, username, roomId });

    const room = await this.roomsRepository.addUserToRoom({ roomId, userId, username });

    this.logger.debug(`Joining room id: ${room.roomId} and userId: ${userId}`);

    return { userId, room };
    //   const joined = await this.roomsRepository.addUseToRoom();
  }
}
