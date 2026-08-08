import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { LearningPath } from "src/learning-path/learning-path.entity";

@Entity()
export class Topic {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    @Column()
    name!: string;
    @Column()
    description!: string;
    @ManyToOne(() => LearningPath)
    learningPath!: LearningPath;
}   