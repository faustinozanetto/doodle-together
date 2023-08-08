import { CanvasPoint } from '@doodle-together/shared';
import { RoomDrawEraserPayload, RoomDrawPointPayload } from '../types/room.types';
import { getToolSizeToWidth } from './room.lib';

export const drawPoint = (drawPointPayload: RoomDrawPointPayload) => {
  const { point, prevPoint, color, size, context } = drawPointPayload;
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

export const drawEraser = (drawEraserPayload: RoomDrawEraserPayload) => {
  const { point, prevPoint, context } = drawEraserPayload;

  // Setup style.
  context.globalCompositeOperation = 'destination-out';
  context.lineWidth = 25;

  const startPoint: CanvasPoint = prevPoint ?? point;

  // Draw
  context.beginPath();
  context.moveTo(startPoint.x, startPoint.y);
  context.lineTo(point.x, point.y);
  context.stroke();
};
