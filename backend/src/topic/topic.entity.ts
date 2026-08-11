import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { LearningPath } from "../learning-path/learning-path.entity";
import { ConfidenceLevel } from "../shared/enums/confidence-level";

@Entity()
export class Topic {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    @Column()
    name!: string;
    @Column()
    description!: string;

    @Column({ type: 'int' })
    order!: number;

    @Column({
        type: 'enum',
        enum: ConfidenceLevel,
        default: ConfidenceLevel.LOW,
    })
    confidenceLevel!: ConfidenceLevel;

    @ManyToOne(() => LearningPath, {
        onDelete: 'CASCADE',
    })
    learningPath!: LearningPath;

}
