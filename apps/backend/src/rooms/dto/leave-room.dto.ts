import { IsNotEmpty } from 'class-validator';

export class LeaveRoomDto {
  @IsNotEmpty({ message: 'Room id is required!' })
  roomId: string;

  @IsNotEmpty({ message: 'Room deleted is required!' })
  roomDeleted: boolean;

  @IsNotEmpty({ message: 'User id is required!' })
  userId: string;
}
