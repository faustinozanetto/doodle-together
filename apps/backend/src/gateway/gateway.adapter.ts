import { INestApplicationContext, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Services } from 'src/utils/constants';
import { Server, ServerOptions } from 'socket.io';
import { IAuthService } from 'src/auth/interfaces/auth-service.interface';

import { SocketWithAuth } from 'src/rooms/types';

export class SocketAdapter extends IoAdapter {
  private readonly logger = new Logger(SocketAdapter.name);

  constructor(private app: INestApplicationContext) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const configService = this.app.get(ConfigService);

    const corsOrigin = configService.get<string>('FRONTEND_ENDPOINT');

    const optionsWithCORS: ServerOptions = {
      ...options,
      cors: {
        credentials: true,
        origin: corsOrigin,
      },
    };

    this.logger.log('Socket Adapter configured with cors origin: ' + corsOrigin);

    const server: Server = super.createIOServer(port, optionsWithCORS);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    server.of('rooms').use(async (socket: SocketWithAuth, next) => {
      const accessToken = socket.handshake.auth.accessToken;

      if (!accessToken) {
        return next(new Error('Not Authenticated. No accessToken was sent'));
      }

      // Decode accesst token and set data in the socket client.
      try {
        const authService = this.app.get<IAuthService>(Services.AUTH_SERVICE);
        const { sub, roomId, username } = await authService.decodeAccessToken({ accessToken });

        socket.userId = sub;
        socket.roomId = roomId;
        (socket.username = username), next();
      } catch {
        next(new Error('Not allowed!'));
      }
    });
    return server;
  }
}
