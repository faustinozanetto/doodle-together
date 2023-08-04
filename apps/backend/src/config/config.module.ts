import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';

import { app, auth, redis, security } from './configs';

export interface ConfigInterface {
  app: ConfigType<typeof app>;
  security: ConfigType<typeof security>;
  auth: ConfigType<typeof auth>;
  redis: ConfigType<typeof redis>;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [app, security, auth, redis],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class GlobalConfigModule {}
