import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Topic } from './topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topic]), UserModule],
  providers: [TopicService],
  controllers: [TopicController]
})
export class TopicModule {}
