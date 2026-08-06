import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  // imports: [TypeOrmModule.forRoot({
  //   entities: [User],
  //   synchronize: true,

  // }), UserService],
  imports: [UserModule, AuthenticationModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
