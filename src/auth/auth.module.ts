import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { authController } from './auth.controller';

@Module({
  imports: [PassportModule, UserModule],
  controllers: [authController],
  providers: [LocalStrategy],
})
export class AuthModule {}
