import { Injectable, Logger, ForbiddenException } from '@nestjs/common';
import { RoomsRepository } from './rooms.repository';
import { DeleteRoomDto } from './dto/delete-room.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { generateRoomId, generateUserId } from '../utils/utils';
import { CreateRoomDto } from './dto/create-room.dto';
import { JoinRoomResponse } from './responses/join-room.response';
import { CreateRoomResponse } from './responses/create-room.response';
import { DeleteRoomResponse } from './responses/delete-room.response';
import { JwtService } from '@nestjs/jwt';
import { RemoveUserFromRoomDto } from './dto/remove-user-to-room.dto';
import { AddUserToRoomDto } from './dto/add-user-to-room.dto';
import { FindRoomDto } from './dto/find-room.dto';
import { FindRoomResponse } from './responses/find-room.response';
import { AddUserToRoomResponse } from './responses/add-user-to-room.response';
import { RemoveUserFromRoomResponse } from './responses/remove-user-to-room.response';
import { PasswordsService } from '../passwords/passwords.service';
import { LeaveRoomDto } from './dto/leave-room.dto';
import { LeaveRoomResponse } from './responses/leave-room.response';
import { IRoomsService } from './interfaces/rooms-service.interface';
import { User } from '@doodle-together/shared';

@Injectable()
export class RoomsService implements IRoomsService {
  private readonly logger = new Logger(RoomsService.name);

  constructor(
    private readonly roomsRepository: RoomsRepository,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordsService
  ) {}

  async createRoom(input: CreateRoomDto): Promise<CreateRoomResponse> {
    const { username, password } = input;

    const userId = generateUserId();
    const roomId = generateRoomId();

    const { hashedPassword } = await this.passwordService.hashPassword({
      password,
    });

    const { room } = await this.roomsRepository.createRoom({
      roomId,
      userId,
      password: hashedPassword,
    });

    const me: User = {
      userId,
      username,
    };

    const accessToken = this.jwtService.sign(
      {
        roomId: room.roomId,
        username,
      },
      {
        subject: userId,
      }
    );

    return { room, accessToken, me };
  }

  async deleteRoom(input: DeleteRoomDto): Promise<DeleteRoomResponse> {
    const { deleted } = await this.roomsRepository.deleteRoom(input);
    return { deleted };
  }

  async findRoom(input: FindRoomDto): Promise<FindRoomResponse> {
    const { room } = await this.roomsRepository.findRoom({ roomId: input.roomId });
    return { room };
  }

  async joinRoom(input: JoinRoomDto): Promise<JoinRoomResponse> {
    const { roomId, username, password } = input;

    const userId = generateUserId();

    const { room } = await this.roomsRepository.findRoom({ roomId });

    // Validate password
    const { isPasswordValid } = await this.passwordService.validatePassword({
      password,
      hashedPassword: room.password,
    });

    if (!isPasswordValid) throw new ForbiddenException('Invalid room password!');

    const me: User = {
      userId,
      username,
    };

    const accessToken = this.jwtService.sign(
      {
        roomId: room.roomId,
        username: me.username,
      },
      {
        subject: me.userId,
      }
    );

    return { room, me, accessToken };
  }

  async leaveRoom(input: LeaveRoomDto): Promise<LeaveRoomResponse> {
    const { roomId, userId } = input;

    await this.removeUserFromRoom({ roomId, userId });

    return { left: true };
  }

  async addUserToRoom(input: AddUserToRoomDto): Promise<AddUserToRoomResponse> {
    const { roomId, username, userId, socketId } = input;

    const { room, user } = await this.roomsRepository.addUserToRoom({ roomId, userId, username, socketId });
    return { room, user };
  }

  async removeUserFromRoom(input: RemoveUserFromRoomDto): Promise<RemoveUserFromRoomResponse> {
    const { roomId, userId } = input;

    const { room } = await this.roomsRepository.removeUserFromRoom({ roomId, userId });
    return { room };
  }
}
