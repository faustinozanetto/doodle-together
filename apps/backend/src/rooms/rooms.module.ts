import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { RoomsGateway } from './rooms.gateway';
import { RoomsRepository } from './rooms.repository';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { jwtModule } from 'src/modules.config';

@Module({
  imports: [ConfigModule, jwtModule],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsRepository, RoomsGateway],
})
export class RoomModule {}
