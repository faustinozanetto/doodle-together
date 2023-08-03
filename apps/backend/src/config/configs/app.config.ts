import { registerAs } from '@nestjs/config';

export const app = registerAs('app', () => ({
  port: Number.parseInt(process.env.APP_PORT, 10),
  frontendEndpoint: process.env.FRONTEND_ENDPOINT,
  roomExpires: Number.parseInt(process.env.ROOM_EXPIRES, 10),
}));
