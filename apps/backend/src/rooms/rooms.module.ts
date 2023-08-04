import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { RoomsGateway } from './rooms.gateway';
import { RoomsRepository } from './rooms.repository';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { jwtModule, redisModule } from '../modules.config';
import { PasswordsService } from '../passwords/passwords.service';

@Module({
  imports: [ConfigModule, jwtModule, redisModule],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsRepository, RoomsGateway, PasswordsService],
})
export class RoomModule {}
