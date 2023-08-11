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

        const oneDayInSeconds = 24 * 60 * 60; // 1 day in seconds

        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + oneDayInSeconds * 1000);

        response.cookie(this.configService.get('JWT_COOKIE_NAME'), accessToken, {
          expires: expirationDate,
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        });

        return { room, user };
      })
    );
  }
}
