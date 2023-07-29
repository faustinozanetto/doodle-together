import { Module } from '@nestjs/common';
import { RoomGateway } from './room.gateway';

@Module({
  controllers: [],
  providers: [RoomGateway],
})
export class RoomModule {}
