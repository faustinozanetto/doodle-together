import Redis from 'ioredis';
import { Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Room, User } from '@doodle-together/shared';
import { RoomResponse } from './responses/room-response';
import { CreateRoomInput } from './dto/inputs/create-room.input';
import { DeleteRoomResponse } from './responses/delete-room.response';
import { DeleteRoomInput } from './dto/inputs/delete-room.input';
import { FindRoomInput } from './dto/inputs/find-room.input';
import { AddUserToRoomInput } from './dto/inputs/add-user-to-room.input';
import { RemoveUserFromRoomInput } from './dto/inputs/remove-user-from-room.input';
import { ConfigInterface } from '../config/config.module';
import { AddUserToRoomResponse } from './responses/add-user-to-room.response';
import { RemoveUserFromRoomResponse } from './responses/remove-user-to-room.response';
import { IORedisKey } from 'src/redis/redis.module';

@Injectable()
export class RoomsRepository {
  private readonly logger = new Logger(RoomsRepository.name);

  constructor(
    private configService: ConfigService<ConfigInterface>,
    @Inject(IORedisKey) private readonly redis: Redis
  ) {}

  /**
   * Creates a room and stores it to redis
   * @param input : Create room input : userId & roomId
   * @returns Room response : room
   */
  async createRoom(input: CreateRoomInput): Promise<RoomResponse> {
    const { roomId, userId, password } = input;
    const room: Room = {
      roomId,
      ownerId: userId,
      password,
      users: {},
    };

    const key = `rooms:${roomId}`;
    // const roomExpireDate = this.configService.get('app', { infer: true }).roomExpires;

    try {
      await this.redis.hmset(
        key,
        'roomId',
        room.roomId,
        'ownerId',
        room.ownerId,
        'password',
        password,
        'users',
        JSON.stringify(room.users)
      );

      return { room };
    } catch (error) {
      this.logger.error(`Failed to create room ${JSON.stringify(room)}`, error);
      throw new InternalServerErrorException('Could not create room!');
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

    try {
      await this.redis.del(key);
      return { deleted: true };
    } catch (error) {
      this.logger.error(`Could not delete room with id: ${roomId}!`, error);
      throw new InternalServerErrorException('Could not delete room!');
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

    try {
      const redisRoom = await this.redis.hgetall(key);

      const room: Room = {
        roomId: redisRoom.roomId,
        ownerId: redisRoom.ownerId,
        users: JSON.parse(redisRoom.users),
        password: redisRoom.password,
      };

      return { room };
    } catch (error) {
      this.logger.error(`Could not find a room with id: ${roomId}!`, error);
      throw new NotFoundException('Room not found!');
    }
  }

  /**
   * Adds a user to a room and updates redis store.
   * @param input Add user to room input : userId & roomId & username
   * @returns Room response : room
   */
  async addUserToRoom(input: AddUserToRoomInput): Promise<AddUserToRoomResponse> {
    const { roomId, userId, username, socketId } = input;

    const key = `rooms:${roomId}`;

    try {
      const redisRoom = await this.redis.hgetall(key);
      const room: Room = {
        roomId: redisRoom.roomId,
        ownerId: redisRoom.ownerId,
        users: JSON.parse(redisRoom.users),
        password: redisRoom.password,
      };

      // Update users map
      const updatedUsers = JSON.parse(redisRoom.users);
      updatedUsers[userId] = { username, socketId };
      room.users = updatedUsers;

      // Update the room data in Redis
      await this.redis.hset(key, 'users', JSON.stringify(room.users));

      const user: User = {
        userId,
        username,
      };

      return { room, user };
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
  async removeUserFromRoom(input: RemoveUserFromRoomInput): Promise<RemoveUserFromRoomResponse> {
    const { roomId, userId } = input;

    const key = `rooms:${roomId}`;

    try {
      const redisRoom = await this.redis.hgetall(key);
      const room: Room = {
        roomId: redisRoom.roomId,
        ownerId: redisRoom.ownerId,
        users: JSON.parse(redisRoom.users),
        password: redisRoom.password,
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
