import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SocketAdapter } from './socket/socket.adapter';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  app.useWebSocketAdapter(new SocketAdapter(app));

  await app.listen(4000);

  logger.log(`Server running on port ${4000}`);
}
bootstrap();
