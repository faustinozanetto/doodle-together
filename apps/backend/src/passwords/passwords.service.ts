import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { HashPasswordInputParams } from './params/hash-password-input.params';
import { ValidatePasswordInputParams } from './params/validate-password-input.params';
import { ConfigService } from '@nestjs/config';
import { HashPasswordResponse } from './responses/hash-password.response';
import { compare, hash } from 'bcrypt';
import { ValidatePasswordResponse } from './responses/validate-password.response';
import { ConfigInterface } from 'src/config/config.module';
import { IPasswordsService } from './interfaces/passwords-service.interface';

@Injectable()
export class PasswordsService implements IPasswordsService {
  private readonly logger = new Logger(PasswordsService.name);

  constructor(@Inject(ConfigService) private configService: ConfigService<ConfigInterface>) {}

  async hashPassword(input: HashPasswordInputParams): Promise<HashPasswordResponse> {
    try {
      const saltOrRounds = this.configService.get('security', {
        infer: true,
      }).bcryptSaltOrRound;

      const hashedPassword = await hash(input.password, saltOrRounds);
      return { hashedPassword };
    } catch (error) {
      throw new BadRequestException('An error ocurred!');
    }
  }

  async validatePassword(input: ValidatePasswordInputParams): Promise<ValidatePasswordResponse> {
    try {
      const isPasswordValid = await compare(input.password, input.hashedPassword);
      return { isPasswordValid };
    } catch (error) {
      throw new BadRequestException('An error ocurred!');
    }
  }
}
