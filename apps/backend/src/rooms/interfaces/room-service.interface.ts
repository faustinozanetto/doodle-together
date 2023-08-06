import { AddUserToRoomDto } from '../dto/add-user-to-room.dto';
import { CreateRoomDto } from '../dto/create-room.dto';
import { DeleteRoomDto } from '../dto/delete-room.dto';
import { FindRoomDto } from '../dto/find-room.dto';
import { JoinRoomDto } from '../dto/join-room.dto';
import { LeaveRoomDto } from '../dto/leave-room.dto';
import { RemoveUserFromRoomDto } from '../dto/remove-user-to-room.dto';
import { AddUserToRoomResponse } from '../responses/add-user-to-room.response';
import { CreateRoomResponse } from '../responses/create-room.response';
import { DeleteRoomResponse } from '../responses/delete-room.response';
import { FindRoomResponse } from '../responses/find-room.response';
import { JoinRoomResponse } from '../responses/join-room.response';
import { LeaveRoomResponse } from '../responses/leave-room.response';
import { RemoveUserFromRoomResponse } from '../responses/remove-user-to-room.response';

export interface IRoomService {
  /**
   * Creates a room by a given input
   * @param input Create room input : username of owner
   * @returns Create room response : room & accessToken
   */
  createRoom(input: CreateRoomDto): Promise<CreateRoomResponse>;
  /**
   * Deletes a room by a given input.
   * @param input Delete room input : roomId
   * @returns Delete room response : deleted
   */
  deleteRoom(input: DeleteRoomDto): Promise<DeleteRoomResponse>;
  /**
   * Finds a room by a given input
   * @param input  Find room input : roomId
   * @returns Find room response : room
   */
  findRoom(input: FindRoomDto): Promise<FindRoomResponse>;
  /**
   * Joins a room by a given input
   * @param input Join room input : roomId & username
   * @returns Join room response : room & accessToken
   */
  joinRoom(input: JoinRoomDto): Promise<JoinRoomResponse>;
  /**
   * Leaves a room by a given input
   * @param input Leave room response : left
   */
  leaveRoom(input: LeaveRoomDto): Promise<LeaveRoomResponse>;
  /**
   * Adds a user to a room
   * @param input Add use to room input : roomId & userId & username
   * @returns Add user to room response : room
   */
  addUserToRoom(input: AddUserToRoomDto): Promise<AddUserToRoomResponse>;
  /**
   * Removes a user from a room
   * @param input Remove user from room input : roomId & userId
   * @returns Remove user from room response : room
   */
  removeUserFromRoom(input: RemoveUserFromRoomDto): Promise<RemoveUserFromRoomResponse>;
}
