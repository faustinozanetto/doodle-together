import { User } from '@doodle-together/database';
import { RoomWithUsers } from '@doodle-together/shared';

export class RemoveUserFromRoomResponse {
  room: RoomWithUsers;
  user: User;
}
