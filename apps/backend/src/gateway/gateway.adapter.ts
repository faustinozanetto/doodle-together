import { INestApplicationContext, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';

import cookie from 'cookie';

import { SocketWithAuth } from 'src/rooms/types';

export class SocketAdapter extends IoAdapter {
  private readonly logger = new Logger(SocketAdapter.name);

  constructor(private app: INestApplicationContext) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const configService = this.app.get(ConfigService);

    const optionsWithCORS: ServerOptions = {
      ...options,
      cors: {
        credentials: true,
        origin: [configService.get('FRONTEND_ENDPOINT')],
      },
    };

    const server: Server = super.createIOServer(port, optionsWithCORS);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    server.of('rooms').use(async (socket: SocketWithAuth, next) => {
      const { cookie: clientCookie } = socket.handshake.headers;
      if (!clientCookie) {
        return next(new Error('Not Authenticated. No cookies were sent'));
      }

      // Decode cookie and verify the cookie name is present
      const parsedCookie = cookie.parse(clientCookie);
      const cookieName = configService.get('JWT_COOKIE_NAME');
      if (!(cookieName in parsedCookie)) {
        return next(new Error('Not Authenticated'));
      }

      const accessToken = parsedCookie[cookieName];

      if (!accessToken) {
        return next(new Error('Not Authenticated. No accessToken was sent'));
      }

      this.logger.log('Parsing accessToken from user.');

      const jwtService = this.app.get(JwtService);
      // Parse the accessToken using jwt and set socket auth data.
      try {
        const payload = jwtService.verify(accessToken);
        socket.userId = payload.sub;
        socket.roomId = payload.roomId;
        socket.username = payload.username;
        next();
      } catch {
        next(new Error('Not allowed!'));
      }
    });
    return server;
  }
}
