import { Injectable, Logger } from '@nestjs/common';
import { RoomsRepository } from './rooms.repository';
import { DeleteRoomDto } from './dto/delete-room.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { generateRoomId, generateUserId } from 'src/utils/utils';
import { CreateRoomDto } from './dto/create-room.dto';
import { FindRoomDto } from './dto/find-room.dto';
import { User } from '@doodle-together/types';
import { JoinRoomResponse } from './responses/join-room.response';
import { CreateRoomResponse } from './responses/create-room.response';
import { DeleteRoomResponse } from './responses/delete-room.response';
import { FindRoomUsersResponse } from './responses/find-room-users.response';
import { LeaveRoomDto } from './dto/leave-room.dto';
import { LeaveRoomResponse } from './responses/leave-room.response';
import { JwtService } from '@nestjs/jwt';
import { RemoveUserFromRoomDto } from './dto/remove-user-to-room.dto';
import { RemoveUserFromRoomResponse } from './responses/remove-user-from-room.response';
import { AddUserToRoomDto } from './dto/add-user-to-room.dto';
import { AddUserToRoomResponse } from './responses/add-user-from-room.response';

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);
  constructor(private readonly roomsRepository: RoomsRepository, private readonly jwtService: JwtService) {}

  async createRoom(input: CreateRoomDto): Promise<CreateRoomResponse> {
    const { username } = input;

    const userId = generateUserId();

    const room = await this.roomsRepository.createRoom({
      username,
    });

    const token = this.jwtService.sign(
      {
        roomId: room.roomId,
        username,
      },
      {
        subject: userId,
      }
    );

    return { room, token };
  }

  async deleteRoom(input: DeleteRoomDto): Promise<DeleteRoomResponse> {
    const deleted = await this.roomsRepository.deleteRoom(input);
    return { deleted };
  }

  async joinRoom(input: JoinRoomDto): Promise<JoinRoomResponse> {
    const { roomId, username } = input;
    const userId = generateUserId();

    const token = this.jwtService.sign(
      {
        roomId,
        username,
      },
      {
        subject: userId,
      }
    );

    const user: User = {
      userId,
      username,
    };

    const room = await this.roomsRepository.addUserToRoom({ roomId, userId, username });

    this.logger.debug(`Joining room id: ${room.roomId} and userId: ${userId}`);

    return { room, user, token };
  }

  async leaveRoom(input: LeaveRoomDto): Promise<LeaveRoomResponse> {
    const { roomId, userId } = input;

    const userRemoved = await this.roomsRepository.removeUserFromRoom({ roomId, userId });

    this.logger.log({ userRemoved });

    this.logger.debug(`Leaving room id: ${roomId} and userId: ${userId}`);

    return { left: true };
  }

  async addUserToRoom(input: AddUserToRoomDto): Promise<AddUserToRoomResponse> {
    const { roomId, username, userId } = input;

    const updatedRoom = await this.roomsRepository.addUserToRoom({ roomId, userId, username });
    return { updatedRoom };
  }

  async removeUserFromRoom(input: RemoveUserFromRoomDto): Promise<RemoveUserFromRoomResponse> {
    const { roomId, userId } = input;

    const updatedRoom = await this.roomsRepository.removeUserFromRoom({ roomId, userId });
    return { updatedRoom };
  }

  async findRoomUsers(input: FindRoomDto): Promise<FindRoomUsersResponse> {
    const users = await this.roomsRepository.findRoomUsers(input);
    return { users };
  }
}
