import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { RoomsGateway } from './rooms.gateway';
import { RoomsRepository } from './rooms.repository';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { jwtModule } from '../modules.config';
import { PasswordsService } from '../passwords/passwords.service';

@Module({
  imports: [ConfigModule, jwtModule],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsRepository, RoomsGateway, PasswordsService],
})
export class RoomModule {}
