import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Topic } from "../topic/topic.entity";

@Entity()
export class Section {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column()
    description!: string;

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