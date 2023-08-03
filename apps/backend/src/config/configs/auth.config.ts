import { registerAs } from '@nestjs/config';

export const auth = registerAs('auth', () => ({
  secret: process.env.JWT_SECRET,
}));
