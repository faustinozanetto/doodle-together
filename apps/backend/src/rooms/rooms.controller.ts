import { Inject, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoomApiResponse, JoinRoomApiResponse, LeaveRoomApiResponse } from '@doodle-together/shared';
import { Services } from 'src/utils/constants';
import { IRoomsService } from './interfaces/rooms-service.interface';
import { IUsersService } from 'src/users/interfaces/users-service.interface';
import { IAuthService } from 'src/auth/interfaces/auth-service.interface';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UsePipes(new ValidationPipe())
@Controller('rooms')
export class RoomsController {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(Services.ROOMS_SERVICE) private readonly roomsService: IRoomsService,
    @Inject(Services.USERS_SERVICE) private readonly usersService: IUsersService,
    @Inject(Services.AUTH_SERVICE) private readonly authService: IAuthService
  ) {}

  @Post('/create')
  async create(
    @Body() body: { username: string; password: string },
    @Res({ passthrough: true }) res: Response
  ): Promise<CreateRoomApiResponse> {
    const { username, password } = body;

    const { user: roomOwner } = await this.usersService.createUser({ username });
    const { room } = await this.roomsService.createRoom({ ownerId: roomOwner.id, password });

    const { accessToken } = await this.authService.generateAccessToken({
      roomId: room.id,
      userId: roomOwner.id,
      username: roomOwner.username,
    });

    res.cookie(this.configService.get('JWT_COOKIE_NAME'), accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return { room };
  }

  @Post('/join')
  async join(
    @Body() body: { roomId: string; username: string; password: string },
    @Res({ passthrough: true }) res: Response
  ): Promise<JoinRoomApiResponse> {
    const { roomId, username, password } = body;

    const { user } = await this.usersService.createUser({ username });
    const { room } = await this.roomsService.joinRoom({ roomId, password, userId: user.id });

    const { accessToken } = await this.authService.generateAccessToken({
      roomId: room.id,
      userId: user.id,
      username: user.username,
    });

    res.cookie(this.configService.get('JWT_COOKIE_NAME'), accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return { room };
  }

  @UseGuards(AuthGuard)
  @Post('/leave')
  async leave(
    @Body() body: { roomId: string; userId: string },
    @Res({ passthrough: true }) res: Response
  ): Promise<LeaveRoomApiResponse> {
    const { roomId, userId } = body;

    const { left } = await this.roomsService.leaveRoom({ roomId, userId });
    res.clearCookie(this.configService.get('JWT_COOKIE_NAME'));

    return { left };
  }
}
