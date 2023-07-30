import Redis from 'ioredis';
import { InternalServerErrorException } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Room } from '@doodle-together/types';
import { RoomResponse } from './responses/room-response';
import { CreateRoomInput } from './dto/inputs/create-room.input';
import { DeleteRoomResponse } from './responses/delete-room.response';
import { DeleteRoomInput } from './dto/inputs/delete-room.input';
import { FindRoomInput } from './dto/inputs/find-room.input';
import { AddUserToRoomInput } from './dto/inputs/add-user-to-room.input';
import { RemoveUserFromRoomInput } from './dto/inputs/remove-user-from-room.input';

@Injectable()
export class RoomsRepository {
  private readonly logger = new Logger(RoomsRepository.name);

  constructor(private configService: ConfigService, @InjectRedis() private readonly redis: Redis) {}

  /**
   * Creates a room and stores it to redis
   * @param input : Create room input : userId & roomId
   * @returns Room response : room
   */
  async createRoom(input: CreateRoomInput): Promise<RoomResponse> {
    const { roomId, userId } = input;
    const room: Room = {
      roomId,
      ownerId: userId,
      users: {},
    };

    this.logger.log(`Creating new room: ${JSON.stringify(room, null, 2)}`);

    const key = `rooms:${roomId}`;
    const roomExpireDate = this.configService.get<string>('ROOM_EXPIRES');

    try {
      await this.redis.hmset(key, 'roomId', room.roomId, 'ownerId', room.ownerId, 'users', JSON.stringify(room.users));

      return { room };
    } catch (error) {
      this.logger.error(`Failed to create room ${JSON.stringify(room)}`, error);
      throw new InternalServerErrorException(`Failed to create room ${JSON.stringify(room)}`);
    }
  }

  /**
   * Deletes a room and updates redis store
   * @param input Delete room input : roomId
   * @returns Room deleted : deleted
   */
  async deleteRoom(input: DeleteRoomInput): Promise<DeleteRoomResponse> {
    const { roomId } = input;

    const key = `rooms:${roomId}`;

    this.logger.log(`Deleting room: ${key}`);

    try {
      await this.redis.call('JSON.DEL', key);
      return { deleted: true };
    } catch (error) {
      this.logger.error(`Failed to delete room with roomId: ${roomId}`, error);
      throw new InternalServerErrorException(`Failed to delete room with roomId: ${roomId}`);
    }
  }

  /**
   * Finds a room by id in redis store
   * @param input Find room input : roomId
   * @returns Room response : room
   */
  async findRoom(input: FindRoomInput): Promise<RoomResponse> {
    const { roomId } = input;
    const key = `rooms:${roomId}`;

    this.logger.log(`Trying to find room with id: ${key}`);

    try {
      const redisRoom = await this.redis.hgetall(key);

      const room: Room = { roomId: redisRoom.roomId, ownerId: redisRoom.ownerId, users: JSON.parse(redisRoom.users) };

      return { room };
    } catch (error) {
      this.logger.error(`Failed to find room with roomId: ${roomId}`, error);
      throw new InternalServerErrorException(`Failed to find room with roomId: ${roomId}`);
    }
  }

  /**
   * Adds a user to a room and updates redis store.
   * @param input Add user to room input : userId & roomId & username
   * @returns Room response : room
   */
  async addUserToRoom(input: AddUserToRoomInput): Promise<RoomResponse> {
    const { roomId, userId, username } = input;

    this.logger.log(`Trying to add user with id: ${userId} to room with id: ${roomId}`);

    const key = `rooms:${roomId}`;

    try {
      const redisRoom = await this.redis.hgetall(key);
      const room: Room = {
        roomId: redisRoom.roomId,
        ownerId: redisRoom.ownerId,
        users: JSON.parse(redisRoom.users),
      };

      // Add the user to the room's users object
      room.users[userId] = username;

      // Update the room data in Redis
      await this.redis.hset(key, 'users', JSON.stringify(room.users));

      return { room };
    } catch (error) {
      this.logger.error(`Failed to add user with id: ${userId} to room with id: ${roomId}`, error);
      throw new InternalServerErrorException(`Failed to add user with id: ${userId} to room with id: ${roomId}`);
    }
  }

  /**
   * Removes a user from a room and updates redis store
   * @param input Remove user from room input : roomId & userId
   * @returns Room response : room
   */
  async removeUserFromRoom(input: RemoveUserFromRoomInput): Promise<RoomResponse> {
    const { roomId, userId } = input;

    const key = `rooms:${roomId}`;

    this.logger.log(`Trying to remove user with id: ${userId} to room with id: ${roomId}`);

    try {
      const redisRoom = await this.redis.hgetall(key);
      const room: Room = {
        roomId: redisRoom.roomId,
        ownerId: redisRoom.ownerId,
        users: JSON.parse(redisRoom.users),
      };

      // Remove the user from the room's users object
      delete room.users[userId];

      // Update the room data in Redis
      await this.redis.hset(key, 'users', JSON.stringify(room.users));

      return { room };
    } catch (error) {
      this.logger.error(`Failed to remove user with id: ${userId} to room with id: ${roomId}`, error);
      throw new InternalServerErrorException(`Failed to remove user with id: ${userId} to room with id: ${roomId}`);
    }
  }
}
