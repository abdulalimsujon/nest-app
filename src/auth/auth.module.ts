import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { User } from 'src/user/entities/user.entity';
import googleAuthConfig from 'src/config/google-auth.config';

@Module({
  imports: [
    ConfigModule.forFeature(googleAuthConfig), // Register your config
    TypeOrmModule.forFeature([User]), // ✅ Needed for UserRepository
    PassportModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: 'mySuperSecretKey123',
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}
