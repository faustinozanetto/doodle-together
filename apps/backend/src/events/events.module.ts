import { Module } from '@nestjs/common';
import { GatewayModule } from 'src/gateway/gateway.module';

@Module({
  imports: [GatewayModule],
  providers: [],
})
export class EventsModule {}
