import { Module } from '@nestjs/common';
import { GetewayModule } from './gateway/gateway.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PasswordsModule } from './passwords/passwords.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    AuthModule,
    UsersModule,
    PasswordsModule,
    GetewayModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
