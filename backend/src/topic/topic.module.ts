import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './topic.entity';
import { UserModule } from '../user/user.module';
import { LearningPathModule } from '../learning-path/learning-path.module';

@Module({
  imports: [TypeOrmModule.forFeature([Topic]), UserModule, LearningPathModule],
  providers: [TopicService],
  controllers: [TopicController]
})
export class TopicModule {}
