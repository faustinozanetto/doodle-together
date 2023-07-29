import { InternalServerErrorException } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Room } from '@doodle-together/types';

@Injectable()
export class RoomsRepository {
  private readonly logger = new Logger(RoomsRepository.name);

  constructor(private configService: ConfigService, @InjectRedis() private readonly redis: Redis) {}

  async createRoom({ userId, roomId }: { userId: string; roomId: string }): Promise<Room> {
    const room = {
      roomId,
      ownerId: userId,
      users: {},
    };

    this.logger.log(`Creating new room: ${JSON.stringify(room, null, 2)}`);

    const key = `rooms:${roomId}`;
    const roomExpireDate = this.configService.get<string>('ROOM_EXPIRES');

    try {
      // await this.redis.call('JSON.SET', key, '.', JSON.stringify(flattenedRoom));
      await this.redis.hmset(key, 'roomId', room.roomId, 'ownerId', room.ownerId, 'users', JSON.stringify(room.users));

      return room;
    } catch (error) {
      this.logger.error(`Failed to create room ${JSON.stringify(room)}\n${error}`);
      throw new InternalServerErrorException();
    }
  }

  async deleteRoom({ roomId }: { roomId: string }): Promise<boolean> {
    const key = `rooms:${roomId}`;

    this.logger.log(`Deleting room: ${key}`);

    try {
      await this.redis.call('JSON.DEL', key);
      return true;
    } catch (error) {
      this.logger.error(`Failed to delete room ${roomId}\n${error}`);
      throw new InternalServerErrorException();
    }
  }

  async findRoom({ roomId }: { roomId: string }): Promise<Room> {
    const key = `rooms:${roomId}`;

    this.logger.log(`Trying to find room with id: ${key}`);

    try {
      //  const room = (await this.redis.call('JSON.GET', key, '.')) as string;
      const room = await this.redis.hgetall(key);
      this.logger.verbose(room);
      this.logger.log({ roomId, room });

      return {
        roomId: room.roomId,
        ownerId: room.ownerId,
        users: JSON.parse(room.users),
      };
    } catch (error) {
      this.logger.error(`Failed to find room with id: ${roomId}\n${error}`);
      throw new InternalServerErrorException(`Failed to find room with id: ${roomId}`);
    }
  }

  async addUserToRoom({
    roomId,
    userId,
    username,
  }: {
    roomId: string;
    userId: string;
    username: string;
  }): Promise<Room> {
    this.logger.log(`Trying to add user with id: ${userId} to room with id: ${roomId}`);

    const key = `rooms:${roomId}`;
    //  const usersPath = `.users.${userId}`;

    try {
      //await this.redis.call('JSON.SET', key, usersPath, JSON.stringify(username));
      const roomData = await this.redis.hgetall(key);
      const room: Room = {
        roomId: roomData.roomId,
        ownerId: roomData.ownerId,
        users: JSON.parse(roomData.users),
      };

      // Add the user to the room's users object
      room.users[userId] = username;

      this.logger.log({ room });

      // Update the room data in Redis
      await this.redis.hset(key, 'users', JSON.stringify(room.users));

      return room;
    } catch (error) {
      this.logger.error(`Failed to add user with id: ${userId} to room with id: ${roomId}`, error);
      throw new InternalServerErrorException(`Failed to add user with id: ${userId} to room with id: ${roomId}`);
    }
  }

  async removeUserFromRoom({ roomId, userId }: { roomId: string; userId: string }): Promise<Room> {
    const key = `rooms:${roomId}`;

    this.logger.log(`Trying to remove user with id: ${userId} to room with id: ${roomId}`);

    try {
      // await this.redis.call('JSON.DEL', roomKey, usersPath);
      const roomData = await this.redis.hgetall(key);
      const room: Room = {
        roomId: roomData.roomId,
        ownerId: roomData.ownerId,
        users: JSON.parse(roomData.users),
      };

      // Remove the user from the room's users object
      delete room.users[userId];

      // Update the room data in Redis
      await this.redis.hset(key, 'users', JSON.stringify(room.users));

      return room;
    } catch (error) {
      this.logger.error(`Failed to remove user with id: ${userId} to room with id: ${roomId}`, error);
      throw new InternalServerErrorException(`Failed to remove user with id: ${userId} to room with id: ${roomId}`);
    }
  }
}
