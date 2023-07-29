import { Injectable, Logger } from '@nestjs/common';
import { RoomsRepository } from './rooms.repository';
import { DeleteRoomDto } from './dto/delete-room.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { generateRoomId, generateUserId } from 'src/utils/utils';
import { CreateRoomDto } from './dto/create-room.dto';
import { JoinRoomResponse } from './responses/join-room.response';
import { CreateRoomResponse } from './responses/create-room.response';
import { DeleteRoomResponse } from './responses/delete-room.response';
import { JwtService } from '@nestjs/jwt';
import { RemoveUserFromRoomDto } from './dto/remove-user-to-room.dto';
import { AddUserToRoomDto } from './dto/add-user-to-room.dto';
import { RoomResponse } from './responses/room-response';
import { FindRoomDto } from './dto/find-room.dto';
import { Room } from '@doodle-together/types';

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);
  constructor(private readonly roomsRepository: RoomsRepository, private readonly jwtService: JwtService) {}

  async createRoom(input: CreateRoomDto): Promise<CreateRoomResponse> {
    const { username } = input;

    const userId = generateUserId();
    const roomId = generateRoomId();

    const room = await this.roomsRepository.createRoom({
      roomId,
      userId,
    });

    this.logger.debug(`Creating token string for roomId: ${room.roomId} and userId: ${userId}`);

    const accessToken = this.jwtService.sign(
      {
        roomId: room.roomId,
        username,
      },
      {
        subject: userId,
      }
    );

    return { room, accessToken };
  }

  async deleteRoom(input: DeleteRoomDto): Promise<DeleteRoomResponse> {
    const deleted = await this.roomsRepository.deleteRoom(input);
    return { deleted };
  }

  async findRoom(input: FindRoomDto): Promise<RoomResponse> {
    const room = await this.roomsRepository.findRoom({ roomId: input.roomId });
    return { room };
  }

  async joinRoom(input: JoinRoomDto): Promise<JoinRoomResponse> {
    const { roomId, username } = input;
    const userId = generateUserId();

    this.logger.debug(`Fetching poll with roomId: ${roomId} for userId: ${userId}`);

    const room = await this.roomsRepository.findRoom({ roomId });

    this.logger.debug(`Creating token string for roomId: ${room.roomId} and userId: ${userId}`);

    const accessToken = this.jwtService.sign(
      {
        roomId: room.roomId,
        username,
      },
      {
        subject: userId,
      }
    );

    return { room, accessToken };
  }

  async addUserToRoom(input: AddUserToRoomDto): Promise<RoomResponse> {
    const { roomId, username, userId } = input;

    const room = await this.roomsRepository.addUserToRoom({ roomId, userId, username });
    return { room };
  }

  async removeUserFromRoom(input: RemoveUserFromRoomDto): Promise<RoomResponse> {
    const { roomId, userId } = input;

    const room = await this.roomsRepository.removeUserFromRoom({ roomId, userId });
    return { room };
  }
}
