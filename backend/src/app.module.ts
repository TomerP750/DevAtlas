import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  // imports: [TypeOrmModule.forRoot({
  //   entities: [User],
  //   synchronize: true,

  // }), UserService],
  imports: [UserModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
