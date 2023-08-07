import { User } from '@doodle-together/database';
import { RoomWithUsers } from '@doodle-together/shared';

export class AddUserToRoomResponse {
  room: RoomWithUsers;
  user: User;
}
