import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicModule } from '../topic/topic.module';
import { Section } from './section.entity';
import { LearningPathModule } from '../learning-path/learning-path.module';

@Module({
  imports: [TypeOrmModule.forFeature([Section]), TopicModule, LearningPathModule],
  providers: [SectionService],
  controllers: [SectionController]
})
export class SectionModule {}
