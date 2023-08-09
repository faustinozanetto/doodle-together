import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { Services } from 'src/utils/constants';
import { UsersService } from './users.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: Services.USERS_SERVICE,
      useClass: UsersService,
    },
    PrismaService,
  ],
  exports: [
    {
      provide: Services.USERS_SERVICE,
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
