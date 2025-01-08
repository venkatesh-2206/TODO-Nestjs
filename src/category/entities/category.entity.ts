import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from 'src/task/entities/task.entity'; 

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn({name:'categoryId'})
  id: number;

  @Column({name:'categoryName'})
  name: string;

  @OneToMany(() => Task, (task) => task.category)
  tasks: Task[];
}

