import { registerAs } from '@nestjs/config';

export const redis = registerAs('redis', () => ({
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: process.env.REDIS_PORT,
}));
