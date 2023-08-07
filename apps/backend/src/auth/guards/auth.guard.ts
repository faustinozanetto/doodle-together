import { Request } from 'express';
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import cookie from 'cookie';
import { ConfigService } from '@nestjs/config';
import { Services } from 'src/utils/constants';
import { IAuthService } from '../interfaces/auth-service.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(Services.AUTH_SERVICE) private readonly authService: IAuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const { user } = await this.authService.validateUser({ accessToken: token });
    request.user = user;

    return true;
  }

  private extractTokenFromHeader(request: Request): string {
    const clientCookie = request.headers.cookie;
    // Decode cookie and verify the cookie name is present
    const parsedCookie = cookie.parse(clientCookie);
    const cookieName = this.configService.get('JWT_COOKIE_NAME');
    if (!(cookieName in parsedCookie)) {
      throw new UnauthorizedException();
    }

    const accessToken = parsedCookie[cookieName];
    if (!accessToken) {
      throw new UnauthorizedException();
    }

    return accessToken;
  }
}
