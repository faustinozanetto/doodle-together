import { z } from 'zod';

export const joinRoomValidationSchema = z.object({
  roomId: z.string({ required_error: 'Room ID is required!' }),
  username: z.string({ required_error: 'Username is required!' }),
});
