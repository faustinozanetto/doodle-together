import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { IAuthService } from './interfaces/auth-service.interface';
import { ValidateUserInputParams } from './params/validate-user-input.params';
import { ValidateUserResponse } from './responses/validate-user.response';
import { GenerateAccessTokenInputParams } from './params/generate-access-token-input.params';
import { GenerateAccessTokenResponse } from './responses/generate-access-token.reseponse';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
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
      await this.jwtService.verifyAsync(accessToken);
    } catch (error) {
      throw new UnauthorizedException();
    }

    return { isValid: true };
  }
}