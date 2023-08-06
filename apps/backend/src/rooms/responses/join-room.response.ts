import { Room, User } from '@doodle-together/shared';

export class JoinRoomResponse {
  room: Room;
  me: User;
  accessToken: string;
}
