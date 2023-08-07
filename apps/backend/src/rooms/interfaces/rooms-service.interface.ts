import { AddUserToRoomInputParams } from '../params/add-user-to-room-input.param';
import { CreateRoomInputParams } from '../params/create-room-input.params';
import { DeleteRoomInputParams } from '../params/delete-room-input.params';
import { AddUserToRoomResponse } from '../responses/add-user-to-room.response';
import { CreateRoomResponse } from '../responses/create-room.response';
import { DeleteRoomResponse } from '../responses/delete-room.response';
import { FindRoomResponse } from '../responses/find-room.response';
import { JoinRoomResponse } from '../responses/join-room.response';
import { LeaveRoomResponse } from '../responses/leave-room.response';
import { RemoveUserFromRoomResponse } from '../responses/remove-user-to-room.response';
import { FindRoomInputParams } from '../params/find-room-input.params';
import { JoinRoomInputParams } from '../params/join-room-input.params';
import { LeaveRoomInputParams } from '../params/leave-room-input.param';
import { RemoveUserFromRoomInputParams } from '../params/remove-user-to-room-input.param';
import { UpdateRoomInputParams } from '../params/update-room-input.params';
import { UpdateRoomResponse } from '../responses/update-room.response';

export interface IRoomsService {
  /**
   * Creates a room by a given input
   * @param input Create room input : username of owner
   * @returns Create room response : room & accessToken
   */
  createRoom(input: CreateRoomInputParams): Promise<CreateRoomResponse>;
  /**
   * Deletes a room by a given input.
   * @param input Delete room input : roomId
   * @returns Delete room response : deleted
   */
  deleteRoom(input: DeleteRoomInputParams): Promise<DeleteRoomResponse>;
  /**
   * Updates a room by a given input.
   * @param input Update room input : roomId : data
   * @returns Updated room response : updatedRoom
   */
  updateRoom(input: UpdateRoomInputParams): Promise<UpdateRoomResponse>;
  /**
   * Finds a room by a given input
   * @param input  Find room input : roomId
   * @returns Find room response : room
   */
  findRoom(input: FindRoomInputParams): Promise<FindRoomResponse>;
  /**
   * Joins a room by a given input
   * @param input Join room input : roomId & username
   * @returns Join room response : room & accessToken
   */
  joinRoom(input: JoinRoomInputParams): Promise<JoinRoomResponse>;
  /**
   * Leaves a room by a given input
   * @param input Leave room response : left
   */
  leaveRoom(input: LeaveRoomInputParams): Promise<LeaveRoomResponse>;
  /**
   * Adds a user to a room
   * @param input Add use to room input : roomId & userId & username
   * @returns Add user to room response : room
   */
  addUserToRoom(input: AddUserToRoomInputParams): Promise<AddUserToRoomResponse>;
  /**
   * Removes a user from a room
   * @param input Remove user from room input : roomId & userId
   * @returns Remove user from room response : room
   */
  removeUserFromRoom(input: RemoveUserFromRoomInputParams): Promise<RemoveUserFromRoomResponse>;
}
