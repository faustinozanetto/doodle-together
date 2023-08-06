import { CanvasPoint } from '@doodle-together/shared';
import { RoomDrawPointPayload } from '../types/room.types';
import { getToolSizeToWidth } from './room.lib';

export const drawPoint = (data: RoomDrawPointPayload) => {
  const { point, prevPoint, color, size, context } = data;
  // Setup style.
  context.globalCompositeOperation = 'source-over';
  context.strokeStyle = color;
  context.lineWidth = getToolSizeToWidth(size);
  context.lineJoin = 'round';
  context.lineCap = 'round';

  const startPoint: CanvasPoint = prevPoint ?? point;

  // Draw
  context.beginPath();
  context.moveTo(startPoint.x, startPoint.y);
  context.lineTo(point.x, point.y);
  context.stroke();
};
