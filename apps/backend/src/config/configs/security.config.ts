import { registerAs } from '@nestjs/config';

export const security = registerAs('security', () => ({
  bcryptSaltOrRound: 10,
}));
