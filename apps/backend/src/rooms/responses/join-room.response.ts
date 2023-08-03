import { Room, User } from '@doodle-together/types';

export class JoinRoomResponse {
  room: Room;
  me: User;
  accessToken: string;
}
