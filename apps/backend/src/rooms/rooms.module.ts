import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { jwtModule, redisModule } from '../modules.config';
import { PasswordsService } from '../passwords/passwords.service';
import { Services } from 'src/utils/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [ConfigModule, UsersModule, jwtModule, redisModule],
  controllers: [RoomsController],
  providers: [
    {
      provide: Services.ROOMS_SERVICE,
      useClass: RoomsService,
    },
    PrismaService,
    PasswordsService,
  ],
  exports: [
    {
      provide: Services.ROOMS_SERVICE,
      useClass: RoomsService,
    },
  ],
})
export class RoomModule {}
