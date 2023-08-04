import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from './redis/redis.module';
import { ConfigInterface } from './config/config.module';

export const redisModule = RedisModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService<ConfigInterface>) => {
    const logger = new Logger('RedisModule');

    return {
      connectionOptions: {
        host: configService.get('redis', { infer: true }).host,
        password: configService.get('redis', { infer: true }).password,
        port: Number(configService.get('redis', { infer: true }).port),
      },
      onClientReady: (client) => {
        logger.log('Redis client ready');

        client.on('error', (err) => {
          logger.error('Redis Client Error: ', err);
        });

        client.on('connect', () => {
          logger.log(`Connected to redis on ${client.options.host}:${client.options.port}`);
        });
      },
    };
  },
  inject: [ConfigService],
});

export const jwtModule = JwtModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: {
      expiresIn: parseInt(configService.get<string>('ROOM_EXPIRES')),
    },
  }),
  inject: [ConfigService],
});
