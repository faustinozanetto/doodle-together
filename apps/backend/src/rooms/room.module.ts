import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { RoomsGateway } from './rooms.gateway';
import { RoomsRepository } from './rooms.repository';
import { RoomsService } from './rooms.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [RoomsService, RoomsRepository, RoomsGateway],
})
export class RoomModule {}
