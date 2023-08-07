import { Module } from '@nestjs/common';
import { ServerGateway } from './gateway';
import { Services } from 'src/utils/constants';
import { GatewaySessionManager } from './gateway.session';
import { ConfigModule } from '@nestjs/config';
import { RoomModule } from 'src/rooms/rooms.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [ConfigModule, RoomModule, UsersModule],
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
