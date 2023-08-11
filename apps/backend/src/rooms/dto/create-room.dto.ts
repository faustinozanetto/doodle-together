import { IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty({ message: 'Password is required!' })
  password: string;

  @IsNotEmpty({ message: 'Username is required!' })
  username: string;
}
