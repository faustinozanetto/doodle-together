import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClearAuthCookieInterceptor implements NestInterceptor {
  constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler<void>): Observable<void> {
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse<Response>();
        response.clearCookie(this.configService.get('JWT_COOKIE_NAME'));
      })
    );
  }
}
