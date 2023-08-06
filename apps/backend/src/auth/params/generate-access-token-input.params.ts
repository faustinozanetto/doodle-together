import { Room, User } from '@doodle-together/database';

export class GenerateAccessTokenInputParams {
  userId: User['id'];
  username: User['username'];
  roomId: Room['id'];
}
