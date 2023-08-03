import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoomModule } from './rooms/rooms.module';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { GlobalConfigModule } from './config/config.module';

@Module({
  imports: [
    GlobalConfigModule,
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<RedisModuleOptions> => {
        const url = configService.get('REDIS_URL');

        return {
          config: { url },
          readyLog: true,
          errorLog: true,
        };
      },
    }),
    RoomModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
