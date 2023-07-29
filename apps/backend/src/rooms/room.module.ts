import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { redisModule } from 'src/modules.config';
import { RoomsGateway } from './rooms.gateway';
import { RoomsRepository } from './rooms.repository';
import { RoomsService } from './rooms.service';

@Module({
  imports: [ConfigModule, redisModule],
  controllers: [],
  providers: [RoomsService, RoomsRepository, RoomsGateway],
})
export class RoomModule {}
