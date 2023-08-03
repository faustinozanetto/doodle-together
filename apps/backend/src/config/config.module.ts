import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';

import { app, auth, security } from './configs';

export interface ConfigInterface {
  app: ConfigType<typeof app>;
  security: ConfigType<typeof security>;
  auth: ConfigType<typeof auth>;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [app, security, auth],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class GlobalConfigModule {}
