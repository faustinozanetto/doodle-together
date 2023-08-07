import { Prisma } from '@doodle-together/database';

export class UpdateUserInputParams {
  userId: string;
  data: Prisma.UserUpdateArgs['data'];
}
