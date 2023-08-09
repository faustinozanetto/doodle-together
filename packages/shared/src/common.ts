import { Room, User } from '@doodle-together/database';

export type CanvasPoint = {
  x: number;
  y: number;
};

export type RoomTool = 'pencil' | 'eraser' | 'clear';
export type RoomToolSize = 'small' | 'medium' | 'large' | 'extra-large';
export type RoomToolStyle = 'solid' | 'dashed' | 'dotted';

export type RoomWithUsers = Room & { users: User[] };
