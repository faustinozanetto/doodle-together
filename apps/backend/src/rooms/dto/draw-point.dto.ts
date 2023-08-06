import { CanvasPoint } from '@doodle-together/shared';

export class DrawPointDto {
  roomId: string;
  point: { color: string; size: string; point: CanvasPoint; prevPoint: CanvasPoint | null };
}
