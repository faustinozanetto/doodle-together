import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigInterface } from './config/config.module';
import { SocketAdapter } from './gateway/gateway.adapter';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appConfig: ConfigInterface['app'] = configService.get('app');

  app.useWebSocketAdapter(new SocketAdapter(app));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: [appConfig.frontendEndpoint], credentials: true });

  const port = appConfig.port;

  await app.listen(port);
  logger.log(`⚡️ Server running on port ${port}`);
}
bootstrap();
