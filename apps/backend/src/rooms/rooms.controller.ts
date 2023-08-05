import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { LeaveRoomDto } from './dto/leave-room.dto';
import { AuthGuard } from './guards/auth-guard';
import { CreateRoomApiResponse, JoinRoomApiResponse, LeaveRoomApiResponse } from '@doodle-together/types';

@UsePipes(new ValidationPipe())
@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Post('/create')
  async create(@Body() body: CreateRoomDto): Promise<CreateRoomApiResponse> {
    const { room, accessToken } = await this.roomsService.createRoom(body);

    return { room, accessToken };
  }

  @Post('/join')
  async join(@Body() body: JoinRoomDto): Promise<JoinRoomApiResponse> {
    const { room, accessToken } = await this.roomsService.joinRoom(body);

    return { room, accessToken };
  }

  @UseGuards(AuthGuard)
  @Post('/leave')
  async leave(@Body() body: LeaveRoomDto): Promise<LeaveRoomApiResponse> {
    const { left } = await this.roomsService.leaveRoom(body);
    return { left };
  }
}
