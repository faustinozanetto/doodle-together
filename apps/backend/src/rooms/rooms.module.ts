import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { RoomsRepository } from './rooms.repository';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { redisModule } from '../modules.config';
import { PasswordsService } from '../passwords/passwords.service';
import { GetewayModule } from 'src/gateway/gateway.module';
import { Services } from 'src/utils/constants';

@Module({
  imports: [ConfigModule, GetewayModule, redisModule],
  controllers: [RoomsController],
  providers: [
    {
      provide: Services.ROOMS_SERVICE,
      useClass: RoomsService,
    },
    RoomsRepository,
    PasswordsService,
  ],
})
export class RoomModule {}
