import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';
import { Services } from 'src/utils/constants';
import { type IRoomsService } from '../interfaces/rooms-service.interface';
import { type IAuthService } from 'src/auth/interfaces/auth-service.interface';

@Injectable()
export class RoomOwnerGuard implements CanActivate {
  private readonly logger = new Logger(RoomOwnerGuard.name);

  constructor(
    @Inject(Services.AUTH_SERVICE) private readonly authService: IAuthService,
    @Inject(Services.ROOMS_SERVICE) private readonly roomsService: IRoomsService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const { authorization } = request.headers;

    if (!authorization) {
      this.logger.error('No authorization token provided');
      throw new ForbiddenException('No accessToken provided');
    }

    try {
      const accessToken = authorization.replace('Bearer ', '');
      // Parse the accessToken using jwt and set socket auth data.
      const { sub: userId, roomId } = await this.authService.decodeAccessToken({ accessToken });

      const { room } = await this.roomsService.findRoom({ roomId });
      if (userId !== room.ownerId) {
        throw new ForbiddenException('Room owner privileges required!');
      }

      return true;
    } catch (err) {
      throw new ForbiddenException('Room owner privileges required!');
    }
  }
}
