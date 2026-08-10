import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicModule } from '../topic/topic.module';
import { Section } from './section.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Section]), TopicModule],
  providers: [SectionService],
  controllers: [SectionController]
})
export class SectionModule {}
