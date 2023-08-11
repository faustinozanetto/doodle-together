import { Request, Response } from 'express';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger, HttpException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BackendErrorResponse } from '@doodle-together/shared';

@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ErrorHandlingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const request = context.switchToHttp().getRequest<Request>();

        const { method, path: url } = request;

        const now = Date.now();
        this.logger.log(`Error [${err.detail}] at ${method} ${url}: ${Date.now() - now}ms`);

        let message = 'Something went wrong :/';
        if (err.response !== undefined) {
          message = Array.isArray(err.response.message) ? err.response.message[0] : err.response.message;
        }
        const payload: BackendErrorResponse = {
          message,
          timestamp: new Date().toISOString(),
          route: request.path,
          method: request.method,
        };

        return throwError(() => new HttpException(payload, err.statusCode || 500));
      })
    );
  }
}
