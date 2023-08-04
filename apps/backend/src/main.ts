import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SocketAdapter } from './socket/socket.adapter';
import { ConfigService } from '@nestjs/config';
import { ConfigInterface } from './config/config.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appConfig: ConfigInterface['app'] = configService.get('app');

  app.useWebSocketAdapter(new SocketAdapter(app));
  app.use(cookieParser());
  app.enableCors({ origin: [appConfig.frontendEndpoint], credentials: true });

  const port = appConfig.port;

  await app.listen(port);
  logger.log(`⚡️ Server running on port ${port}`);
}
bootstrap();
