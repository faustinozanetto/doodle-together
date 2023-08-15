import { z } from 'zod';
import { userIdValidationSchema, usernameValidationSchema } from '@modules/user/lib/user.validations';
import { useRoomStore } from '@modules/state/room.slice';

export const ROOM_PASSWORD_MIN_LENGHT = 8;
export const ROOM_PASSWORD_MAX_LENGHT = 24;

export const roomIdValidationSchema = z
  .string({ required_error: 'Room ID is required!' })
  .nonempty('Room id must not be empty!');

export const roomPasswordValidationSchema = z
  .string({ required_error: 'Room Password is required!' })
  .min(ROOM_PASSWORD_MIN_LENGHT, `Room Password min length is ${ROOM_PASSWORD_MIN_LENGHT}!`)
  .max(ROOM_PASSWORD_MAX_LENGHT, `Room Password max length is ${ROOM_PASSWORD_MAX_LENGHT}!`)
  .regex(/^(?=.*[A-Za-z])(?=.*\d)/, 'Password must contain at least one letter and number!');

export const joinRoomValidationSchema = z.object({
  roomId: roomIdValidationSchema,
  password: roomPasswordValidationSchema,
  username: usernameValidationSchema,
});

export const createRoomValidationSchema = z.object({
  password: roomPasswordValidationSchema,
  username: usernameValidationSchema,
});

export const leaveRoomValidationSchema = z.object({
  roomId: roomIdValidationSchema,
  userId: userIdValidationSchema,
});

export const deleteRoomValidationSchema = z.object({
  roomId: roomIdValidationSchema.refine((roomId) => roomId === useRoomStore.getState().room?.id, {
    message: 'Room ids do not match!',
  }),
});
