import { Prisma } from '@doodle-together/database';

export class UpdateRoomInputParams {
  roomId: string;
  data: Prisma.RoomUpdateArgs['data'];
}
