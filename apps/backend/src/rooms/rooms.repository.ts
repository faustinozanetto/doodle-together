import { Inject, InternalServerErrorException } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { IORedisKey } from 'src/redis/redis.module';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomsRepository {
  private readonly logger = new Logger(RoomsRepository.name);

  constructor(configService: ConfigService, @Inject(IORedisKey) private readonly redisClient: Redis) {}

  async createRoom(input: CreateRoomDto) {
    const { roomId } = input;

    const key = `rooms:${roomId}`;
    const ROOM_DURATION = 7200;

    const room = {
      roomId,
    };

    this.logger.log(`Creating new room: ${JSON.stringify(room, null, 2)} with TTL ${ROOM_DURATION}`);

    try {
      await this.redisClient
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
}
