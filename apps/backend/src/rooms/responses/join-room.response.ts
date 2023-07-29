import { Room, User } from '@doodle-together/types';

export class JoinRoomResponse {
  room: Room;
  user: User;
  token: string;
}
