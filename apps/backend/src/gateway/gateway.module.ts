import { Module } from '@nestjs/common';
import { ServerGateway } from './gateway';
import { Services } from 'src/utils/constants';
import { GatewaySessionManager } from './gateway.session';
import { jwtModule } from 'src/modules.config';
import { ConfigModule } from '@nestjs/config';
import { RoomModule } from 'src/rooms/rooms.module';

@Module({
  imports: [ConfigModule, RoomModule, jwtModule],
  providers: [
    ServerGateway,
    {
      provide: Services.GATEWAY_SESSION_MANAGER,
      useClass: GatewaySessionManager,
    },
  ],
  exports: [
    ServerGateway,
    {
      provide: Services.GATEWAY_SESSION_MANAGER,
      useClass: GatewaySessionManager,
    },
  ],
})
export class GetewayModule {}
