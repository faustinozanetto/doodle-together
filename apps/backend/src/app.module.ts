import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoomModule } from './rooms/room.module';

@Module({
  imports: [ConfigModule.forRoot(), RoomModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
