import { Injectable, Logger, ForbiddenException, Inject } from '@nestjs/common';
import { DeleteRoomInputParams } from './params/delete-room-input.params';
import { CreateRoomInputParams } from './params/create-room-input.params';
import { JoinRoomResponse } from './responses/join-room.response';
import { CreateRoomResponse } from './responses/create-room.response';
import { DeleteRoomResponse } from './responses/delete-room.response';
import { AddUserToRoomInputParams } from './params/add-user-to-room-input.param';
import { FindRoomResponse } from './responses/find-room.response';
import { AddUserToRoomResponse } from './responses/add-user-to-room.response';
import { RemoveUserFromRoomResponse } from './responses/remove-user-to-room.response';
import { LeaveRoomResponse } from './responses/leave-room.response';
import { IRoomsService } from './interfaces/rooms-service.interface';
import { LeaveRoomInputParams } from './params/leave-room-input.param';
import { RemoveUserFromRoomInputParams } from './params/remove-user-to-room-input.param';
import { JoinRoomInputParams } from './params/join-room-input.params';
import { FindRoomInputParams } from './params/find-room-input.params';
import { PrismaService } from 'src/prisma/prisma.service';
import { Services } from 'src/utils/constants';
import { IUsersService } from 'src/users/interfaces/users-service.interface';
import { UpdateRoomInputParams } from './params/update-room-input.params';
import { UpdateRoomResponse } from './responses/update-room.response';
import { IPasswordsService } from 'src/passwords/interfaces/passwords-service.interface';

@Injectable()
export class RoomsService implements IRoomsService {
  private readonly logger = new Logger(RoomsService.name);

  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    @Inject(Services.USERS_SERVICE) private readonly usersService: IUsersService,
    @Inject(Services.PASSWORDS_SERVICE) private readonly passwordsService: IPasswordsService
  ) {}

  async createRoom(input: CreateRoomInputParams): Promise<CreateRoomResponse> {
    const { ownerId, password } = input;

    const { hashedPassword } = await this.passwordsService.hashPassword({
      password,
    });

    const room = await this.prismaService.room.create({
      data: {
        password: hashedPassword,
        ownerId,
      },
      include: { users: true },
    });

    return { room };
  }

  async deleteRoom(input: DeleteRoomInputParams): Promise<DeleteRoomResponse> {
    const { roomId } = input;
    await this.prismaService.room.delete({
      where: { id: roomId },
    });
    return { deleted: true };
  }

  async findRoom(input: FindRoomInputParams): Promise<FindRoomResponse> {
    const { roomId } = input;
    const room = await this.prismaService.room.findUnique({ where: { id: roomId }, include: { users: true } });

    return { room };
  }

  async updateRoom(input: UpdateRoomInputParams): Promise<UpdateRoomResponse> {
    const { roomId, data } = input;

    const updatedRoom = await this.prismaService.room.update({
      where: { id: roomId },
      data,
      include: { users: true },
    });

    return { updatedRoom };
  }

  async joinRoom(input: JoinRoomInputParams): Promise<JoinRoomResponse> {
    const { roomId, userId, password } = input;

    const { room } = await this.findRoom({ roomId });
    // Validate password
    const { isPasswordValid } = await this.passwordsService.validatePassword({
      password,
      hashedPassword: room.password,
    });

    if (!isPasswordValid) throw new ForbiddenException('Invalid room password!');

    const { room: updatedRoom } = await this.addUserToRoom({ roomId, userId });

    return { room: updatedRoom };
  }

  async leaveRoom(input: LeaveRoomInputParams): Promise<LeaveRoomResponse> {
    const { roomId, userId } = input;

    await this.removeUserFromRoom({ roomId, userId });

    return { left: true };
  }

  async addUserToRoom(input: AddUserToRoomInputParams): Promise<AddUserToRoomResponse> {
    const { roomId, userId } = input;

    const { updatedRoom } = await this.updateRoom({ roomId, data: { users: { connect: { id: userId } } } });
    const { user } = await this.usersService.findUser({ userId });

    return { room: updatedRoom, user };
  }

  async removeUserFromRoom(input: RemoveUserFromRoomInputParams): Promise<RemoveUserFromRoomResponse> {
    const { roomId, userId } = input;

    const { user } = await this.usersService.findUser({ userId });

    const { updatedRoom } = await this.updateRoom({ roomId, data: { users: { disconnect: { id: userId } } } });
    return { room: updatedRoom, user };
  }
}
