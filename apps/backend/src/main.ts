import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigInterface } from './config/config.module';
import { SocketAdapter } from './gateway/gateway.adapter';

import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appConfig: ConfigInterface['app'] = configService.get('app');
  const authConfig: ConfigInterface['auth'] = configService.get('auth');

  app.useWebSocketAdapter(new SocketAdapter(app));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: [appConfig.frontendEndpoint], credentials: true });
  app.use(cookieParser());

  // const redisStore = new RedisStore({
  //   client: redisClient,
  // });

  app.use(
    session({
      secret: authConfig.sessionSecret,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 86400000, // expires 1 day
      },
      //  store: redisStore,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const port = appConfig.port;

  await app.listen(port);
  logger.log(`⚡️ Server running on port ${port}`);
}
bootstrap();
