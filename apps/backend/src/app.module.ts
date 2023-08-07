import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PasswordsModule } from './passwords/passwords.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    AuthModule,
    UsersModule,
    PasswordsModule,
    GatewayModule,
    EventsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
