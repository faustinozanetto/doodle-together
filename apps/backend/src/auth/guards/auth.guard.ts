import { Request } from 'express';
import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { type IAuthService } from '../interfaces/auth-service.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(Services.AUTH_SERVICE) private readonly authService: IAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = this.extractTokenFromHeader(request);

    const { user } = await this.authService.validateUser({ accessToken });
    // @ts-ignore
    request.user = user;

    return true;
  }

  private extractTokenFromHeader(request: Request): string {
    const { authorization } = request.headers;

    if (!authorization) {
      throw new ForbiddenException('No accessToken provided');
    }

    const accessToken = authorization.replace('Bearer ', '');
    return accessToken;
  }
}
