import { Inject, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthGuard } from './guards/auth-guard';
import { CreateRoomApiResponse, JoinRoomApiResponse, LeaveRoomApiResponse } from '@doodle-together/shared';
import { Services } from 'src/utils/constants';
import { IRoomsService } from './interfaces/rooms-service.interface';
import { IUsersService } from 'src/users/interfaces/users-service.interface';

@UsePipes(new ValidationPipe())
@Controller('rooms')
export class RoomsController {
  constructor(
    @Inject(Services.ROOMS_SERVICE) private readonly roomsService: IRoomsService,
    @Inject(Services.USERS_SERVICE) private readonly usersService: IUsersService
  ) {}

  @Post('/create')
  async create(@Body() body: { username: string; password: string }): Promise<CreateRoomApiResponse> {
    const { username, password } = body;

    const { user: roomOwner } = await this.usersService.createUser({ username });
    const { room } = await this.roomsService.createRoom({ ownerId: roomOwner.id, password });

    return { room };
  }

  @Post('/join')
  async join(@Body() body: { roomId: string; username: string; password: string }): Promise<JoinRoomApiResponse> {
    const { roomId, username, password } = body;

    const { user } = await this.usersService.createUser({ username });

    const { room } = await this.roomsService.joinRoom({ roomId, password, userId: user.id });

    return { room };
  }

  @UseGuards(AuthGuard)
  @Post('/leave')
  async leave(@Body() body: { roomId: string; userId: string }): Promise<LeaveRoomApiResponse> {
    const { roomId, userId } = body;

    const { left } = await this.roomsService.leaveRoom({ roomId, userId });
    return { left };
  }
}
