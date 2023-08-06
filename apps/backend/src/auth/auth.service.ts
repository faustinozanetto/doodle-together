import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAuthService } from './interfaces/auth-service.interface';
import { IUsersService } from 'src/users/interfaces/users-service.interface';
import { ValidateUserInputParams } from './params/validate-user-input.params';
import { ValidateUserResponse } from './responses/validate-user.response';
import { Services } from 'src/utils/constants';
import { GenerateAccessTokenInputParams } from './params/generate-access-token-input.params';
import { GenerateAccessTokenResponse } from './responses/generate-access-token.reseponse';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(Services.USERS_SERVICE) private readonly usersService: IUsersService,
    @Inject(JwtService) private jwtService: JwtService,
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
    const { userId } = input;

    this.logger.log(`Validating user with userId: ${userId}`);

    const { user } = await this.usersService.findUser({ userId });

    return { user };
  }
}
