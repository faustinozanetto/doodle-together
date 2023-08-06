import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { Services } from 'src/utils/constants';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
  exports: [
    {
      provide: Services.USERS_SERVICE,
      useClass: UserService,
    },
  ],
})
export class UsersModule {}
