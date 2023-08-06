import { CreateUserInputParams } from '../params/create-user-input.params';
import { DeleteUserInputParams } from '../params/delete-user-input.params';
import { FindUserInputParams } from '../params/find-user-input.params';
import { CreateUserResponse } from '../responses/create-user.response';
import { DeleteUserResponse } from '../responses/delete-user.response';
import { FindUserResponse } from '../responses/find-user.response';

export interface IUsersService {
  createUser(input: CreateUserInputParams): Promise<CreateUserResponse>;
  deleteUser(input: DeleteUserInputParams): Promise<DeleteUserResponse>;
  findUser(input: FindUserInputParams): Promise<FindUserResponse>;
}
