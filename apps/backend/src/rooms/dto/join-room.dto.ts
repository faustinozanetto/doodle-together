import { IsNotEmpty } from 'class-validator';

export class JoinRoomDto {
  @IsNotEmpty({ message: 'Room id is required!' })
  roomId: string;

  @IsNotEmpty({ message: 'Password is required!' })
  password: string;

  @IsNotEmpty({ message: 'Username is required!' })
  username: string;
}
