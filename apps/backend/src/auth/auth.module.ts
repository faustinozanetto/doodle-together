import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Services } from 'src/utils/constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: parseInt(configService.get<string>('ROOM_EXPIRES')),
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  providers: [
    {
      provide: Services.AUTH_SERVICE,
      useClass: AuthService,
    },
  ],
  exports: [
    {
      provide: Services.AUTH_SERVICE,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
