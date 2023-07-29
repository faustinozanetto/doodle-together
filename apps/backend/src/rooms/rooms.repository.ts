import { Inject, InternalServerErrorException } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { CreateRoomDto } from './dto/create-room.dto';
import { DeleteRoomDto } from './dto/delete-room.dto';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { JoinRoomDto } from './dto/join-room.dto';
import { AddUserToRoomDto } from './dto/add-user-to-room.dto';

@Injectable()
export class RoomsRepository {
  private readonly logger = new Logger(RoomsRepository.name);

  constructor(configService: ConfigService, @InjectRedis() private readonly redis: Redis) {}

  async createRoom(input: CreateRoomDto) {
    const { roomId } = input;

    const key = `rooms:${roomId}`;
    const ROOM_DURATION = 7200;

    const room = {
      roomId,
    };

    this.logger.log(`Creating new room: ${JSON.stringify(room, null, 2)} with TTL ${ROOM_DURATION}`);

    try {
      await this.redis
        .multi([
          ['send_command', 'JSON.SET', key, '.', JSON.stringify(room)],
          ['expire', key, ROOM_DURATION],
        ])
        .exec();
      return room;
    } catch (error) {
      this.logger.error(`Failed to create room ${JSON.stringify(room)}\n${error}`);
      throw new InternalServerErrorException();
    }
  }

  async deleteRoom(input: DeleteRoomDto) {
    const { roomId } = input;
    const key = `rooms:${roomId}`;

    this.logger.log(`Deleting room: ${key}`);

    try {
      await this.redis.del(key);
      return true;
    } catch (error) {
      this.logger.error(`Failed to delete room ${key}\n${error}`);
      throw new InternalServerErrorException();
    }
  }

  async addUseToRoom(input: AddUserToRoomDto) {
    const { roomId, userId, username } = input;

    const key = `rooms:${roomId}`;
    const usersPath = `.users.${userId}`;

    try {
      await this.redis.sendCommand('JSON.SET', key, usersPath, JSON.stringify(username));
      return true;
    } catch (error) {
      this.logger.error(`Failed to add user with userID-name: ${userId}-${username} to roomId: ${roomId}`);
      throw new InternalServerErrorException();
    }
  }
}
