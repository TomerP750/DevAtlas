import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Topic } from "../topic/topic.entity";
import { ConfidenceLevel } from "../shared/enums/confidence-level";

@Entity()
export class Section {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column({ type: 'text', nullable: true })
    codeSnippet?: string;

    @Column({
        type: 'enum',
        enum: ConfidenceLevel,
        default: ConfidenceLevel.LOW,
    })
    confidenceLevel!: ConfidenceLevel;

    @ManyToOne(() => Topic, {
        onDelete: 'CASCADE',
    })
    topic!: Topic;

    @Column({ default: false })
    completed!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}