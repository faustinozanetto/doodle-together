import { User, Room } from '@doodle-together/database';

export class RemoveUserFromRoomResponse {
  room: Room;
  user: User;
}
