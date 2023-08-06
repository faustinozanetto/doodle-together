import { Module } from '@nestjs/common';
import { GlobalConfigModule } from './config/config.module';
import { GetewayModule } from './gateway/gateway.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [GlobalConfigModule, GetewayModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
