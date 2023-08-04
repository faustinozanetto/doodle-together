import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SocketAdapter } from './socket/socket.adapter';
import { ConfigService } from '@nestjs/config';
import { ConfigInterface } from './config/config.module';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const { frontendEndpoint }: ConfigInterface['app'] = configService.get('app');

  app.useWebSocketAdapter(new SocketAdapter(app));
  app.use(cookieParser());
  app.use(bodyParser({ limit: '50mb', type: 'json' }));
  app.enableCors({ origin: [frontendEndpoint], credentials: true });

  await app.listen(4000);

  logger.log(`Server running on port ${4000}`);
}
bootstrap();
