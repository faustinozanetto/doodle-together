import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { IAuthService } from './interfaces/auth-service.interface';
import { ValidateUserInputParams } from './params/validate-user-input.params';
import { ValidateUserResponse } from './responses/validate-user.response';
import { GenerateAccessTokenInputParams } from './params/generate-access-token-input.params';
import { GenerateAccessTokenResponse } from './responses/generate-access-token.reseponse';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Services } from 'src/utils/constants';
import { type IUsersService } from 'src/users/interfaces/users-service.interface';
import { DecodeAccessTokenInputParams } from './params/decode-access-token-input.params';
import { DecodeAccessTokenResponse } from './responses/decode-access-token.reseponse';

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(Services.USERS_SERVICE) private readonly usersService: IUsersService,
    @Inject(ConfigService) private readonly configService: ConfigService
  ) {}

  async generateAccessToken(input: GenerateAccessTokenInputParams): Promise<GenerateAccessTokenResponse> {
    const { roomId, userId, username } = input;

    const payload = {
      roomId,
      username,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      subject: userId,
      expiresIn: this.configService.get<string>('JWT_EXPIRY'),
    });

    return { accessToken };
  }

  async validateUser(input: ValidateUserInputParams): Promise<ValidateUserResponse> {
    const { accessToken } = input;

    try {
      const { sub: userId } = await this.jwtService.verifyAsync(accessToken);
      const { user } = await this.usersService.findUser({ userId });
      return { user };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async decodeAccessToken(input: DecodeAccessTokenInputParams): Promise<DecodeAccessTokenResponse> {
    const { accessToken } = input;

    try {
      const { sub, roomId, exp } = await this.jwtService.verifyAsync(accessToken);

      return { sub, roomId, exp };
    } catch (err) {
      throw new UnauthorizedException('Not authorized!');
    }
  }
}
