import { Module } from '@nestjs/common';
import { PasswordsService } from './passwords.service';
import { Services } from 'src/utils/constants';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  providers: [
    {
      provide: Services.PASSWORDS_SERVICE,
      useClass: PasswordsService,
    },
    ConfigService,
  ],
  exports: [
    {
      provide: Services.PASSWORDS_SERVICE,
      useClass: PasswordsService,
    },
  ],
})
export class PasswordsModule {}
