import { nanoid } from 'nanoid';

export const generateUserId = () => nanoid();
export const generateRoomId = () => nanoid(12);
