import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAuthService } from './interfaces/auth-service.interface';
import { IUsersService } from 'src/users/interfaces/users-service.interface';
import { ValidateUserInputParams } from './params/validate-user-input.params';
import { ValidateUserResponse } from './responses/validate-user.response';
import { Services } from 'src/utils/constants';
import { GenerateAccessTokenInputParams } from './params/generate-access-token-input.params';
import { GenerateAccessTokenResponse } from './responses/generate-access-token.reseponse';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(Services.USERS_SERVICE) private readonly usersService: IUsersService,
    private jwtService: JwtService
  ) {}

  generateAccessToken(input: GenerateAccessTokenInputParams): GenerateAccessTokenResponse {
    const { user } = input;
    const { id, username, roomId } = user;

    const payload = {
      roomId,
      username,
    };
    const accessToken = this.jwtService.sign(payload, {
      subject: id,
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
