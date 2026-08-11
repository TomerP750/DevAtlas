import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './topic.entity';
import { UserModule } from '../user/user.module';
import { LearningPathModule } from '../learning-path/learning-path.module';
import { Section } from '../section/section.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topic, Section]), UserModule, LearningPathModule],
  providers: [TopicService],
  controllers: [TopicController],
  exports: [TopicService]
})
export class TopicModule {}
