import { z } from 'zod';
import { usernameValidationSchema } from '@modules/user/lib/user.validations';

export const ROOM_PASSWORD_MIN_LENGHT = 8;
export const ROOM_PASSWORD_MAX_LENGHT = 24;

export const roomIdValidationSchema = z.string({ required_error: 'Room ID is required!' });

export const roomPasswordValidationSchema = z
  .string({ required_error: 'Room Password is required!' })
  .min(ROOM_PASSWORD_MIN_LENGHT, `Room Password min length is ${ROOM_PASSWORD_MIN_LENGHT}!`)
  .max(ROOM_PASSWORD_MAX_LENGHT, `Room Password max length is ${ROOM_PASSWORD_MAX_LENGHT}!`)
  .regex(/^(?=.*[A-Za-z])(?=.*\d)/, 'Password must contain at least one letter and number!');

export const joinRoomValidationSchema = z.object({
  id: roomIdValidationSchema,
  password: roomPasswordValidationSchema,
  username: usernameValidationSchema,
});

export const createRoomValidationSchema = z.object({
  password: roomPasswordValidationSchema,
  username: usernameValidationSchema,
});
