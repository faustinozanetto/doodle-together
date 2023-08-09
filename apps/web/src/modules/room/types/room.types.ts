import { CanvasPoint, RoomToolSize } from '@doodle-together/shared';

export type RoomDrawPointPayload = {
  color: string;
  context: CanvasRenderingContext2D;
  point: CanvasPoint;
  prevPoint: CanvasPoint | null;
  size: RoomToolSize;
};

export type RoomDrawEraserPayload = {
  context: CanvasRenderingContext2D;
  point: CanvasPoint;
  prevPoint: CanvasPoint | null;
};
