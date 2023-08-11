import { CallHandler, ExecutionContext, Inject, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClearAuthCookieInterceptor implements NestInterceptor {
  private logger = new Logger(ClearAuthCookieInterceptor.name);
  constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler<void>): Observable<void> {
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse<Response>();

        this.logger.log('Removing access token using interceptor!');

        response.clearCookie(this.configService.get('JWT_COOKIE_NAME'));
      })
    );
  }
}
