import { Module } from '@nestjs/common';
import { LearningPathService } from './learning-path.service';
import { LearningPathController } from './learning-path.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearningPath } from './learning-path.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([LearningPath])],
  providers: [LearningPathService],
  controllers: [LearningPathController],
})
export class LearningPathModule {}
