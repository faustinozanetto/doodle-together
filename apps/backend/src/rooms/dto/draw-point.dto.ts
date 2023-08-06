import { CanvasPoint } from '@doodle-together/shared/dist';

export class DrawPointDto {
  roomId: string;
  point: { color: string; size: string; point: CanvasPoint; prevPoint: CanvasPoint | null };
}
