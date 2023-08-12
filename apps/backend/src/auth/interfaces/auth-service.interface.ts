import { DecodeAccessTokenInputParams } from '../params/decode-access-token-input.params';
import { GenerateAccessTokenInputParams } from '../params/generate-access-token-input.params';
import { ValidateUserInputParams } from '../params/validate-user-input.params';
import { DecodeAccessTokenResponse } from '../responses/decode-access-token.reseponse';
import { GenerateAccessTokenResponse } from '../responses/generate-access-token.reseponse';
import { ValidateUserResponse } from '../responses/validate-user.response';

export interface IAuthService {
  validateUser(input: ValidateUserInputParams): Promise<ValidateUserResponse>;
  generateAccessToken(input: GenerateAccessTokenInputParams): Promise<GenerateAccessTokenResponse>;
  decodeAccessToken(input: DecodeAccessTokenInputParams): Promise<DecodeAccessTokenResponse>;
}
