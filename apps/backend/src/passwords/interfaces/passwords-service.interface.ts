import { HashPasswordInputParams } from '../params/hash-password-input.params';
import { ValidatePasswordInputParams } from '../params/validate-password-input.params';
import { HashPasswordResponse } from '../responses/hash-password.response';
import { ValidatePasswordResponse } from '../responses/validate-password.response';

export interface IPasswordsService {
  hashPassword(input: HashPasswordInputParams): Promise<HashPasswordResponse>;
  validatePassword(input: ValidatePasswordInputParams): Promise<ValidatePasswordResponse>;
}
