import { Room, User } from '@doodle-together/types';

export class CreateRoomResponse {
  room: Room;
  me: User;
  accessToken: string;
}
