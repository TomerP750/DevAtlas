import { Module } from '@nestjs/common';
import { LearningPathService } from './learning-path.service';
import { LearningPathController } from './learning-path.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearningPath } from './learning-path.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([LearningPath])],
  providers: [LearningPathService],
  controllers: [LearningPathController],
  exports: [LearningPathService]
})
export class LearningPathModule {}
