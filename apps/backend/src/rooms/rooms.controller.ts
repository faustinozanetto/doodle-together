import { Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { LeaveRoomDto } from './dto/leave-room.dto';
import { AuthGuard } from './guards/auth-guard';
import { CreateRoomApiResponse, JoinRoomApiResponse, LeaveRoomApiResponse } from '@doodle-together/types';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ConfigInterface } from 'src/config/config.module';

@UsePipes(new ValidationPipe())
@Controller('rooms')
export class RoomsController {
  constructor(
    private configService: ConfigService<ConfigInterface>,
    private roomsService: RoomsService
  ) {}

  @Post('/create')
  async create(
    @Body() body: CreateRoomDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<CreateRoomApiResponse> {
    const { room, me, accessToken } = await this.roomsService.createRoom(body);

    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: false,
      secure: true,
      path: '/',
      maxAge: 60 * 60,
    });

    return { room, me };
  }

  @Post('/join')
  async join(@Body() body: JoinRoomDto, @Res({ passthrough: true }) response: Response): Promise<JoinRoomApiResponse> {
    const { room, accessToken, me } = await this.roomsService.joinRoom(body);

    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: false,
      secure: true,
      path: '/',
      maxAge: 60 * 60,
    });

    return { room, me };
  }

  @UseGuards(AuthGuard)
  @Post('/leave')
  async leave(
    @Body() body: LeaveRoomDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<LeaveRoomApiResponse> {
    const { left } = await this.roomsService.leaveRoom(body);
    response.clearCookie('accessToken');
    return { left };
  }
}
