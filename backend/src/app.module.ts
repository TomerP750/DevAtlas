import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LearningPathModule } from './learning-path/learning-path.module';
import { TopicModule } from './topic/topic.module';
import { SectionModule } from './section/section.module';
import { LearningPath } from './learning-path/learning-path.entity';
import { Section } from './section/section.entity';
import { Topic } from './topic/topic.entity';
import { RefreshTokenService } from './authentication/refresh-token/refresh-token.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development', //TODO add development and cross env to scripts 
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, LearningPath, Topic, Section],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule, 
    AuthenticationModule, 
    LearningPathModule, 
    TopicModule, SectionModule
  ],
  providers: [AppService, {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  }, RefreshTokenService],
  controllers: [AppController],
})
export class AppModule { }
