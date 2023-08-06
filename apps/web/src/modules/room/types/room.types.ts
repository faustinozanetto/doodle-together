import { CanvasPoint } from '@doodle-together/shared';

export type RoomDrawPointPayload = {
  color: string;
  context: CanvasRenderingContext2D;
  point: CanvasPoint;
  prevPoint: CanvasPoint | null;
  size: RoomToolSize;
};

export type RoomTool = 'pencil' | 'eraser' | 'clear';
export type RoomToolSize = 'small' | 'medium' | 'large' | 'extra-large';
export type RoomToolStyle = 'solid' | 'dashed' | 'dotted';
