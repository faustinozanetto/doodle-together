import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { redisModule } from '../modules.config';
import { Services } from 'src/utils/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { PasswordsModule } from 'src/passwords/passwords.module';

@Module({
  imports: [ConfigModule, UsersModule, PasswordsModule, redisModule],
  controllers: [RoomsController],
  providers: [
    {
      provide: Services.ROOMS_SERVICE,
      useClass: RoomsService,
    },
    PrismaService,
  ],
  exports: [
    {
      provide: Services.ROOMS_SERVICE,
      useClass: RoomsService,
    },
  ],
})
export class RoomModule {}
