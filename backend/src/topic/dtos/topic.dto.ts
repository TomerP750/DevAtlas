import { Expose } from 'class-transformer';
import { ConfidenceLevel } from '../../shared/enums/confidence-level';

export class TopicDto {
    @Expose()
    id!: string;
    @Expose()
    name!: string;
    @Expose()
    description!: string;
    @Expose()
    order!: number;
    @Expose()
    confidenceLevel!: ConfidenceLevel;
    @Expose()
    learningPathId!: string;
    @Expose()
    completedSectionsCount!: number;
    @Expose()
    totalSectionsCount!: number;
}