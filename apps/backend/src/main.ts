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
  app.enableCors({
    origin: [configService.get('FRONTEND_ENDPOINT')],
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
  });
  app.use(cookieParser());

  const port = configService.get('APP_PORT');

  await app.listen(port);
  logger.log(`⚡️ Server running on port ${port}`);
}
bootstrap();
