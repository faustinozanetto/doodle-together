import { INestApplicationContext, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { SocketWithAuth } from '../rooms/types';
import { ConfigService } from '@nestjs/config';
import { ConfigInterface } from 'src/config/config.module';

export class SocketAdapter extends IoAdapter {
  private readonly logger = new Logger(SocketAdapter.name);
  constructor(private app: INestApplicationContext) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const configService = this.app.get(ConfigService);
    const { frontendEndpoint }: ConfigInterface['app'] = configService.get('app');

    const optionsWithCORS: ServerOptions = {
      ...options,
      cors: {
        credentials: true,
        origin: [frontendEndpoint],
      },
    };

    const jwtService = this.app.get(JwtService);
    const server: Server = super.createIOServer(port, optionsWithCORS);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    server.of('rooms').use(async (socket: SocketWithAuth, next) => {
      const accessToken = socket.handshake.auth.accessToken;

      try {
        const payload = jwtService.verify(accessToken);

        socket.userId = payload.sub;
        socket.roomId = payload.roomId;
        next();
      } catch {
        next(new Error('FORBIDDEN'));
      }
    });

    return server;
  }
}
