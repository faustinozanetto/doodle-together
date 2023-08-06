import { Inject, Injectable, Logger } from '@nestjs/common';
import { HashPasswordInputParams } from './params/hash-password-input.params';
import { ValidatePasswordInputParams } from './params/validate-password-input.params';
import { ConfigService } from '@nestjs/config';
import { HashPasswordResponse } from './responses/hash-password.response';
import { compare, genSalt, hash } from 'bcrypt';
import { ValidatePasswordResponse } from './responses/validate-password.response';
import { IPasswordsService } from './interfaces/passwords-service.interface';

@Injectable()
export class PasswordsService implements IPasswordsService {
  private readonly logger = new Logger(PasswordsService.name);

  constructor(@Inject(ConfigService) private configService: ConfigService) {}

  async hashPassword(input: HashPasswordInputParams): Promise<HashPasswordResponse> {
    const saltOrRounds = Number.parseInt(this.configService.get('SALT_ROUNDS')) ?? 10;
    const salt = await genSalt(saltOrRounds);
    const hashedPassword = await hash(input.password, salt);
    return { hashedPassword };
  }

  async validatePassword(input: ValidatePasswordInputParams): Promise<ValidatePasswordResponse> {
    const isPasswordValid = await compare(input.password, input.hashedPassword);
    return { isPasswordValid };
  }
}
