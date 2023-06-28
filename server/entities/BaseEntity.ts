/**
 * DO NOT: CHANGE file name BaseEntity to base.entity bacause we dont need to create this entity in Database
 * So that, we dont name this file as the rest file in entities folder
 */
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export abstract class Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
