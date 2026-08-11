import { IsNumber } from 'class-validator';
import { User } from '../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class LearningPath {
  
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({ default: 0 })
  @IsNumber()
  totalSectionsCount!: number;

  @Column({ default: 0 })
  @IsNumber()
  totalTopicsCount!: number;

  @Column({ default: 0 })
  @IsNumber()
  completedTopicsCount!: number;

  @ManyToOne(() => User, { nullable: false })
  user!: User;

  @Column()
  avatarUrl!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
