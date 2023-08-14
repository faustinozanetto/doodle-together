import { Module } from '@nestjs/common';
import { ServerGateway } from './gateway';
import { Services } from 'src/utils/constants';
import { GatewaySessionManager } from './gateway.session';
import { ConfigModule } from '@nestjs/config';
import { RoomModule } from 'src/rooms/rooms.module';
import { UsersModule } from 'src/users/users.module';
import { GatewayRoomsManager } from './gateway.rooms';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ConfigModule, AuthModule, RoomModule, UsersModule],
  providers: [
    ServerGateway,
    {
      provide: Services.GATEWAY_SESSION_MANAGER,
      useClass: GatewaySessionManager,
    },
    {
      provide: Services.GATEWAY_ROOMS_MANAGER,
      useClass: GatewayRoomsManager,
    },
  ],
  exports: [
    ServerGateway,
    {
      provide: Services.GATEWAY_SESSION_MANAGER,
      useClass: GatewaySessionManager,
    },
    {
      provide: Services.GATEWAY_ROOMS_MANAGER,
      useClass: GatewayRoomsManager,
    },
  ],
})
export class GatewayModule {}
