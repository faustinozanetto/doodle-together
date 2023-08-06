import { Request } from 'express';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(ConfigService) protected configService: ConfigService) {
    const secret = configService.get('JWT_SECRET');

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWTFromCookie]),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  private static extractJWTFromCookie(request: Request): string | null {
    if (request.cookies && request.cookies.accessToken) {
      return request.cookies.accessToken;
    }
    return null;
  }

  async validate(payload: any) {
    console.log({ payload });

    return { userId: payload.sub, username: payload.username };
  }
}
