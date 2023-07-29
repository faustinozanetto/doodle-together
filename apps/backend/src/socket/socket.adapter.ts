import { INestApplicationContext, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { SocketWithAuth } from '../rooms/types';

export class SocketAdapter extends IoAdapter {
  private readonly logger = new Logger(SocketAdapter.name);
  constructor(private app: INestApplicationContext) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const cors = {
      origin: [`http://localhost:3000`],
    };

    this.logger.log('Configuring SocketIO server with custom CORS options', {
      cors,
    });

    const optionsWithCORS: ServerOptions = {
      ...options,
      cors,
    };

    const jwtService = this.app.get(JwtService);
    const server: Server = super.createIOServer(port, optionsWithCORS);

    server.of('rooms').use(createTokenMiddleware(jwtService, this.logger));

    return server;
  }
}

const createTokenMiddleware = (jwtService: JwtService, logger: Logger) => (socket: SocketWithAuth, next) => {
  // for Postman testing support, fallback to token header
  const token = socket.handshake.auth.token || socket.handshake.headers['token'];

  logger.debug(`Validating auth token before connection: ${token}`);

  try {
    const payload = jwtService.verify(token);
    socket.userId = payload.sub;
    socket.roomId = payload.roomId;
    socket.username = payload.username;
    next();
  } catch {
    next(new Error('FORBIDDEN'));
  }
};
