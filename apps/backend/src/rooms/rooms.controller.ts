import { Get, Inject, Logger, Param, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Body, Delete, Controller, Post } from '@nestjs/common';
import {
  CreateRoomApiResponse,
  GetRoomApiResponse,
  JoinRoomApiResponse,
  LeaveRoomApiResponse,
} from '@doodle-together/shared';
import { Services } from 'src/utils/constants';
import { type IRoomsService } from './interfaces/rooms-service.interface';
import { type IUsersService } from 'src/users/interfaces/users-service.interface';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ServerGateway } from 'src/gateway/gateway';
import { CreateRoomDto } from './dto/create-room.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { LeaveRoomDto } from './dto/leave-room.dto';
import { type IAuthService } from 'src/auth/interfaces/auth-service.interface';
import { RoomOwnerGuard } from './guards/room-owner.guard';

@UsePipes(new ValidationPipe())
@Controller('rooms')
export class RoomsController {
  private logger = new Logger(RoomsController.name);

  constructor(
    @Inject(ServerGateway) private readonly gateway: ServerGateway,
    @Inject(Services.ROOMS_SERVICE) private readonly roomsService: IRoomsService,
    @Inject(Services.USERS_SERVICE) private readonly usersService: IUsersService,
    @Inject(Services.AUTH_SERVICE) private readonly authService: IAuthService
  ) {}

  @Get(':roomId')
  async get(@Param('roomId') roomId: string): Promise<GetRoomApiResponse> {
    const { room } = await this.roomsService.findRoom({ roomId });

    return { room };
  }

  @Post('/create')
  async create(@Body() body: CreateRoomDto): Promise<CreateRoomApiResponse> {
    const { username, password } = body;

    const { user: roomOwner } = await this.usersService.createUser({ username });
    const { room } = await this.roomsService.createRoom({ ownerId: roomOwner.id, password });
    await this.usersService.updateUser({ userId: roomOwner.id, data: { roomId: room.id } });

    this.gateway.roomsManager.addRoomToManager(room.id, { isDeleted: false });

    const { accessToken } = await this.authService.generateAccessToken({
      roomId: room.id,
      userId: roomOwner.id,
      username: roomOwner.username,
    });

    return { room, user: roomOwner, accessToken };
  }

  @Post('/join')
  async join(@Body() body: JoinRoomDto): Promise<JoinRoomApiResponse> {
    const { roomId, username, password } = body;

    const { user } = await this.usersService.createUser({ username });
    const { room } = await this.roomsService.joinRoom({ roomId, password, userId: user.id });

    const { accessToken } = await this.authService.generateAccessToken({
      roomId: room.id,
      userId: user.id,
      username: user.username,
    });

    return { room, user, accessToken };
  }

  @Post('/leave')
  @UseGuards(AuthGuard)
  async leave(@Body() body: LeaveRoomDto): Promise<LeaveRoomApiResponse> {
    const { roomId, userId, roomDeleted } = body;

    let left = true;
    if (!roomDeleted) {
      const { left: roomLeft } = await this.roomsService.leaveRoom({ roomId, userId });
      await this.usersService.deleteUser({ userId });
      left = roomLeft;
    }

    return { left };
  }

  @Delete(':roomId')
  @UseGuards(RoomOwnerGuard)
  async delete(@Param('roomId') roomId: string) {
    this.logger.log(`Deleting room with roomId: ${roomId}`);

    // Mark room as deleted.
    this.gateway.roomsManager.updateRoom(roomId, { isDeleted: true });

    await this.roomsService.deleteRoom({ roomId });

    return { deleted: true };
  }
}
