import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { Services } from 'src/utils/constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ session: true }),
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
  ],
  providers: [
    {
      provide: Services.AUTH_SERVICE,
      useClass: AuthService,
    },
    JwtStrategy,
  ],
  exports: [
    {
      provide: Services.AUTH_SERVICE,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}