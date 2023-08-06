import { Module } from '@nestjs/common';
import { GlobalConfigModule } from './config/config.module';
import { GetewayModule } from './gateway/gateway.module';

@Module({
  imports: [GlobalConfigModule, GetewayModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
