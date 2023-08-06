import { Room, User } from '@doodle-together/shared';

export class CreateRoomResponse {
  room: Room;
  me: User;
  accessToken: string;
}
