import { CallHandler, ExecutionContext, Inject, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';
import { Services } from 'src/utils/constants';
import { IAuthService } from '../interfaces/auth-service.interface';
import { Response } from 'express';
import { Room, User } from '@doodle-together/database';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SetAuthCookieInterceptor implements NestInterceptor {
  private logger = new Logger(SetAuthCookieInterceptor.name);

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(Services.AUTH_SERVICE) private readonly authService: IAuthService
  ) {}

  intercept(context: ExecutionContext, next: CallHandler<{ user: User; room: Room }>) {
    return next.handle().pipe(
      map(async (data) => {
        const response = context.switchToHttp().getResponse<Response>();
        const { room, user } = data;

        const { accessToken } = await this.authService.generateAccessToken({
          roomId: room.id,
          userId: user.id,
          username: user.username,
        });

        this.logger.log(`Creating access token cookie for user with userId: ${user.id} and username: ${user.username}`);

        response.cookie(this.configService.get('JWT_COOKIE_NAME'), accessToken, {
          httpOnly: true,
          sameSite: false,
          secure: true,
          maxAge: 1000 * 60 * 60 * 24, // 1 day,
        });

        return { room, user };
      })
    );
  }
}
