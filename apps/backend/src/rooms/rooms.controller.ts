import {
  ForbiddenException,
  Inject,
  Logger,
  Param,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Body, Delete, Controller, Post } from '@nestjs/common';
import { CreateRoomApiResponse, JoinRoomApiResponse, LeaveRoomApiResponse } from '@doodle-together/shared';
import { Services } from 'src/utils/constants';
import { IRoomsService } from './interfaces/rooms-service.interface';
import { IUsersService } from 'src/users/interfaces/users-service.interface';
import { IAuthService } from 'src/auth/interfaces/auth-service.interface';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { User } from '@doodle-together/database';
import { ServerGateway } from 'src/gateway/gateway';
import { SetAuthCookieInterceptor } from 'src/auth/interceptors/set-auth-cookie.interceptor';
import { ClearAuthCookieInterceptor } from 'src/auth/interceptors/clear-auth-cookie.interceptor';

@UsePipes(new ValidationPipe())
@Controller('rooms')
export class RoomsController {
  private logger = new Logger(RoomsController.name);

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(ServerGateway) private readonly gateway: ServerGateway,
    @Inject(Services.ROOMS_SERVICE) private readonly roomsService: IRoomsService,
    @Inject(Services.USERS_SERVICE) private readonly usersService: IUsersService,
    @Inject(Services.AUTH_SERVICE) private readonly authService: IAuthService
  ) {}

  @Post('/create')
  @UseInterceptors(SetAuthCookieInterceptor)
  async create(@Body() body: { username: string; password: string }): Promise<CreateRoomApiResponse> {
    const { username, password } = body;

    const { user: roomOwner } = await this.usersService.createUser({ username });
    const { room } = await this.roomsService.createRoom({ ownerId: roomOwner.id, password });
    await this.usersService.updateUser({ userId: roomOwner.id, data: { roomId: room.id } });

    this.gateway.roomsManager.addRoomToManager(room.id, { isDeleted: false });

    return { room, user: roomOwner };
  }

  @Post('/join')
  @UseInterceptors(SetAuthCookieInterceptor)
  async join(@Body() body: { roomId: string; username: string; password: string }): Promise<JoinRoomApiResponse> {
    const { roomId, username, password } = body;

    const { user } = await this.usersService.createUser({ username });
    const { room } = await this.roomsService.joinRoom({ roomId, password, userId: user.id });

    return { room, user };
  }

  @Post('/leave')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClearAuthCookieInterceptor)
  async leave(@Body() body: { roomId: string; userId: string; roomDeleted: boolean }): Promise<LeaveRoomApiResponse> {
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
  @UseGuards(AuthGuard)
  async delete(@Param('roomId') roomId: string, @CurrentUser() user: User) {
    const { room } = await this.roomsService.findRoom({ roomId });

    if (room.ownerId !== user.id) {
      throw new ForbiddenException('Not allowed!');
    }

    this.logger.log(`Deleting room with roomId: ${room.id}`);

    // Mark room as deleted.
    this.gateway.roomsManager.updateRoom(roomId, { isDeleted: true });

    await this.roomsService.deleteRoom({ roomId });

    return { deleted: true };
  }
}
