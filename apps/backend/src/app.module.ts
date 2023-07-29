import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoomModule } from './rooms/room.module';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RoomModule,
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<RedisModuleOptions> => {
        const url = configService.get('REDIS_URL');
        console.log({ url });

        return {
          config: { url },
          readyLog: true,
          errorLog: true,
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
