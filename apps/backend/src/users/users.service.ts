import { Injectable, Logger, Inject } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { IUsersService } from './interfaces/users-service.interface';
import { CreateUserInputParams } from './params/create-user-input.params';
import { DeleteUserInputParams } from './params/delete-user-input.params';
import { FindUserInputParams } from './params/find-user-input.params';
import { CreateUserResponse } from './responses/create-user.response';
import { DeleteUserResponse } from './responses/delete-user.response';
import { FindUserResponse } from './responses/find-user.response';

@Injectable()
export class UsersService implements IUsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async createUser(input: CreateUserInputParams): Promise<CreateUserResponse> {
    const { username } = input;
    const user = await this.prismaService.user.create({
      data: {
        username,
      },
    });

    return { user };
  }

  async deleteUser(input: DeleteUserInputParams): Promise<DeleteUserResponse> {
    const { userId } = input;
    await this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });

    return { deleted: true };
  }

  async findUser(input: FindUserInputParams): Promise<FindUserResponse> {
    const { userId } = input;

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    return { user };
  }
}
