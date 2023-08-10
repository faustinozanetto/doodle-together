import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SocketAdapter } from './gateway/gateway.adapter';

import cookieParser from 'cookie-parser';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useWebSocketAdapter(new SocketAdapter(app));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const allowCrossDomain = (req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, configService.get('FRONTEND_ENDPOINT'));
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    next();
  };
  // app.enableCors({
  //   origin: [configService.get('FRONTEND_ENDPOINT')],
  //   credentials: true,
  //   methods: 'GET,PUT,POST,DELETE,OPTIONS',
  //   allowedHeaders: [
  //     'Access-Control-Allow-Headers',
  //     'Content-Type, Authorization, Content-Length, X-Requested-With, X-Api-Key',
  //   ],
  // });
  app.use(allowCrossDomain);
  app.use(cookieParser());

  const port = configService.get('APP_PORT');

  await app.listen(port);
  logger.log(`⚡️ Server running on port ${port}`);
}
bootstrap();
