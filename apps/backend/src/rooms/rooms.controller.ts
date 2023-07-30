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
    const { room, accessToken } = await this.roomsService.createRoom(body);
    const { room: updatedRoom } = await this.roomsService.addUserToRoom({
      roomId: room.roomId,
      userId: room.ownerId,
      username: body.username,
    });

    return { room: updatedRoom, accessToken };
  }

  @Post('/join')
  async join(@Body() body: JoinRoomDto) {
    const { room, accessToken } = await this.roomsService.joinRoom(body);

    const { room: updatedRoom } = await this.roomsService.addUserToRoom({
      roomId: room.roomId,
      userId: room.ownerId,
      username: body.username,
    });

    return { room: updatedRoom, accessToken };
  }
}
