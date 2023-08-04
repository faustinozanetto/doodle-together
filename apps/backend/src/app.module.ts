import { Module } from '@nestjs/common';
import { RoomModule } from './rooms/rooms.module';
import { GlobalConfigModule } from './config/config.module';

@Module({
  imports: [GlobalConfigModule, RoomModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
