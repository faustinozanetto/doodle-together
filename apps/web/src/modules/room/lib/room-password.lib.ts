import { Room } from '@doodle-together/database';

import * as bcrypt from 'bcrypt';

export const SALT_OR_ROUNDS = 10;

export const hashRoomPassword = async (password: Room['password']): Promise<string> => {
  const hash = await bcrypt.hash(password, SALT_OR_ROUNDS);
  return hash;
};

export const validateRoomPassword = async (
  password: Room['password'],
  hashedPassword: Room['password']
): Promise<boolean> => {
  const valid = await bcrypt.compare(password, hashedPassword);
  return valid;
};
