import { Injectable, CanActivate, ExecutionContext, ForbiddenException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithAuth } from '../types';
import { User } from '@doodle-together/shared';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request: RequestWithAuth = context.switchToHttp().getRequest();

    const { accessToken } = request.body;

    try {
      const payload = this.jwtService.verify(accessToken);
      const user: User = {
        userId: payload.sub,
        username: payload.username,
      };
      request.user = user;
      request.roomId = payload.roomId;
      return true;
    } catch {
      throw new ForbiddenException('Invalid authorization token');
    }
  }
}
