import { User } from '@doodle-together/shared';
import { INestApplicationContext, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { ConfigInterface } from 'src/config/config.module';
import { SocketWithAuth } from 'src/rooms/types';

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

    const server: Server = super.createIOServer(port, optionsWithCORS);

    server.of('rooms').use(async (socket: SocketWithAuth, next) => {
      const accessToken = socket.handshake.auth.accessToken;

      if (!accessToken) {
        return next(new Error('Not Authenticated. No accessToken was sent'));
      }

      this.logger.log('Parsing accessToken from user.');

      const jwtService = this.app.get(JwtService);
      // Parse the accessToken using jwt and set socket auth data.
      try {
        const payload = jwtService.verify(accessToken);
        const user: User = {
          userId: payload.sub,
          username: payload.username,
        };
        socket.user = user;
        socket.roomId = payload.roomId;
        next();
      } catch {
        next(new Error('Not allowed!'));
      }
    });
    return server;
  }
}
