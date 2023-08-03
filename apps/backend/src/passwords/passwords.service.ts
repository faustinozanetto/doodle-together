import { BadRequestException, Injectable } from '@nestjs/common';
import { HashPasswordInput } from './dto/hash-password.input';
import { ValidatePasswordInput } from './dto/validate-password.input';
import { ConfigService } from '@nestjs/config';
import { HashPasswordResponse } from './responses/hash-password.response';
import { compare, hash } from 'bcrypt';
import { ValidatePasswordResponse } from './responses/validate-password.response';
import { ConfigInterface } from 'src/config/config.module';

@Injectable()
export class PasswordsService {
  constructor(private configService: ConfigService<ConfigInterface>) {}

  get bcryptSaltRounds(): string | number {
    const saltOrRounds = this.configService.get('security', {
      infer: true,
    }).bcryptSaltOrRound;
    return Number.isInteger(Number(saltOrRounds)) ? Number(saltOrRounds) : saltOrRounds;
  }

  async hashPassword(input: HashPasswordInput): Promise<HashPasswordResponse> {
    try {
      const hashedPassword = await hash(input.password, this.bcryptSaltRounds);
      return { hashedPassword };
    } catch (error) {
      throw new BadRequestException('An error ocurred!');
    }
  }

  async validatePassword(input: ValidatePasswordInput): Promise<ValidatePasswordResponse> {
    try {
      const isPasswordValid = await compare(input.password, input.hashedPassword);
      return { isPasswordValid };
    } catch (error) {
      throw new BadRequestException('An error ocurred!');
    }
  }
}
