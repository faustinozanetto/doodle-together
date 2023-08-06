import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { RoomsRepository } from './rooms.repository';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { jwtModule, redisModule } from '../modules.config';
import { PasswordsService } from '../passwords/passwords.service';
import { Services } from 'src/utils/constants';

@Module({
  imports: [ConfigModule, jwtModule, redisModule],
  providers: [
    {
      provide: Services.ROOMS_SERVICE,
      useClass: RoomsService,
    },
    RoomsRepository,
    PasswordsService,
  ],
  controllers: [RoomsController],
  exports: [
    {
      provide: Services.ROOMS_SERVICE,
      useClass: RoomsService,
    },
  ],
})
export class RoomModule {}
