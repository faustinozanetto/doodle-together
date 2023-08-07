import { Room, User } from '@doodle-together/database';

export type CanvasPoint = {
  x: number;
  y: number;
};

export type RoomWithUsers = Room & { users: User[] };
