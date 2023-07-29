import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JoinRoomDto } from './dto/join-room.dto';

@UsePipes(new ValidationPipe())
@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Post()
  async create(@Body() body: CreateRoomDto) {
    return await this.roomsService.createRoom(body);
  }

  @Post('/join')
  async join(@Body() body: JoinRoomDto) {
    return await this.roomsService.joinRoom(body);
  }
}
