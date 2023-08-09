import { Module } from '@nestjs/common';
import { GatewayModule } from 'src/gateway/gateway.module';
import { RoomListenerEvents } from './room-listener.events';

@Module({
  imports: [GatewayModule],
  providers: [RoomListenerEvents],
})
export class EventsModule {}
