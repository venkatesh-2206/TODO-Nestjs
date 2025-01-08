import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    DeleteDateColumn,
  } from "typeorm";
  import { User } from "src/user/entities/user.entity";
  import { Task } from "src/task/entities/task.entity";
  @Entity("buckets")
  export class Bucket {
    @PrimaryGeneratedColumn({ name: "bucket_id" })
    id: number;
  
    @Column({ name: "bucket_name" })
    name: string;
  
    @ManyToOne(() => User, (user => user.bucket))
    @JoinColumn({ name: "user_id" })
    user: User;

    @DeleteDateColumn()
    deletedAt:Date

    @OneToMany(()=>Task,(task)=>task.bucket,{cascade:true})
    tasks:Task[]
  
  }
  