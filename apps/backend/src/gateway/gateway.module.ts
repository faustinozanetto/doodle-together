import { Module } from '@nestjs/common';
import { ServerGateway } from './gateway';
import { Services } from 'src/utils/constants';
import { GatewaySessionManager } from './gateway.session';
import { jwtModule } from 'src/modules.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, jwtModule],
  exports: [
    ServerGateway,
    {
      provide: Services.GATEWAY_SESSION_MANAGER,
      useClass: GatewaySessionManager,
    },
  ],
  providers: [
    ServerGateway,
    {
      provide: Services.GATEWAY_SESSION_MANAGER,
      useClass: GatewaySessionManager,
    },
  ],
})
export class GetewayModule {}
