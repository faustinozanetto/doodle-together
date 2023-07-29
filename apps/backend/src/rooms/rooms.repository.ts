import { InternalServerErrorException } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { CreateRoomDto } from './dto/create-room.dto';
import { DeleteRoomDto } from './dto/delete-room.dto';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { AddUserToRoomDto } from './dto/add-user-to-room.dto';
import { FindRoomDto } from './dto/find-room.dto';
import { FindRoomUsersDto } from './dto/find-room-users.dto';
import { Room, User } from '@doodle-together/types';
import { RemoveUserFromRoomDto } from './dto/remove-user-to-room.dto';
import { generateRoomId } from 'src/utils/utils';

@Injectable()
export class RoomsRepository {
  private readonly logger = new Logger(RoomsRepository.name);

  constructor(configService: ConfigService, @InjectRedis() private readonly redis: Redis) {}

  async createRoom(input: CreateRoomDto): Promise<Room> {
    const roomId = generateRoomId();

    const room: Room = {
      roomId,
      users: [],
    };

    this.logger.log(`Creating new room: ${JSON.stringify(room, null, 2)}`);

    const key = `rooms:${roomId}`;

    try {
      // TODO: set expiry date in command
      await this.redis.set(key, JSON.stringify(room));
      return room;
    } catch (error) {
      this.logger.error(`Failed to create room ${JSON.stringify(room)}\n${error}`);
      throw new InternalServerErrorException();
    }
  }

  async deleteRoom(input: DeleteRoomDto): Promise<boolean> {
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

  async findRoom(input: FindRoomDto): Promise<Room> {
    const { roomId } = input;
    const key = `rooms:${roomId}`;

    this.logger.log(`Trying to find room with id: ${key}`);

    try {
      const result = await this.redis.get(key);
      return JSON.parse(result) as Room;
    } catch (error) {
      this.logger.error(`Failed to find room with id: ${key}\n${error}`);
      throw new InternalServerErrorException();
    }
  }

  async addUserToRoom(input: AddUserToRoomDto): Promise<Room> {
    const { roomId, userId, username } = input;

    const roomKey = `rooms:${roomId}`;
    const userKey = `user:${userId}`;

    this.logger.log(`Trying to add user with id: ${userId} to room with id: ${roomId}`);

    const user = {
      userId,
      username,
    };

    try {
      await this.redis.set(userKey, JSON.stringify(user));
      await this.redis.sadd(`${roomKey}:users`, userId);

      return this.findRoom({ roomId });
    } catch (error) {
      this.logger.error(`Failed to add user with id: ${userId} to room with id: ${roomId}`, error);
      throw new InternalServerErrorException();
    }
  }

  async removeUserFromRoom(input: RemoveUserFromRoomDto): Promise<Room> {
    const { roomId, userId } = input;

    const roomKey = `rooms:${roomId}`;
    const userKey = `user:${userId}`;

    this.logger.log(`Trying to remove user with id: ${userId} to room with id: ${roomId}`);

    try {
      await this.redis.hdel(roomKey, userKey);
      await this.redis.srem(`${roomKey}:users`, userId);

      return this.findRoom({ roomId });
    } catch (error) {
      this.logger.error(`Failed to remove user with id: ${userId} to room with id: ${roomId}`, error);
      throw new InternalServerErrorException();
    }
  }

  async findRoomUsers(input: FindRoomUsersDto): Promise<User[]> {
    const { roomId } = input;

    const roomKey = `rooms:${roomId}`;
    try {
      const userIds = await this.redis.smembers(`${roomKey}:users`);
      const users: User[] = [];

      for (const userId of userIds) {
        const userKey = `user:${userId}`;
        const data = await this.redis.get(userKey);
        users.push(JSON.parse(data));
      }

      return users;
    } catch (error) {
      this.logger.error(`Failed to find room users for roomId: ${roomId}`, error);
      throw new InternalServerErrorException();
    }
  }
}
