import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserModule } from '../user/user.module';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { RefreshToken } from './refresh-token/refresh-token.entity';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import type { StringValue } from 'ms';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: { expiresIn: configService.getOrThrow<StringValue>('JWT_ACCESS_TOKEN_EXPIRATION') },
      }),
    }),
    TypeOrmModule.forFeature([RefreshToken]),
  ],
  providers: [
    AuthenticationService,
    RefreshTokenService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AdminGuard,
    },
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule { }
