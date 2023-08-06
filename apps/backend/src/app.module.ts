import { Module } from '@nestjs/common';
import { GlobalConfigModule } from './config/config.module';
import { GetewayModule } from './gateway/gateway.module';
import { PrismaService } from './prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    GlobalConfigModule,
    PassportModule.register({ session: true }),
    JwtModule.registerAsync({
      imports: [GlobalConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: parseInt(configService.get<string>('ROOM_EXPIRES')),
        },
      }),
      inject: [ConfigService],
    }),
    GetewayModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
