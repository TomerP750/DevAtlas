import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { LearningPath } from "../learning-path/learning-path.entity";
import { IsOptional } from "class-validator";

@Entity()
export class Topic {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    @Column()
    name!: string;
    @Column()
    description!: string;
    @Column()
    @IsOptional()
    codeSnippet?: string;
    @ManyToOne(() => LearningPath)
    learningPath!: LearningPath;

    @Column({ default: false })
    completed!: boolean;
}   