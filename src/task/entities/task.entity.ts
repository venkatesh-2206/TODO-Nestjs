import {Entity,PrimaryGeneratedColumn,Column,OneToMany,ManyToOne,JoinColumn, DeleteDateColumn}from "typeorm"
import { Bucket } from "src/bucket/entities/bucket.entity"
import { Category } from "src/category/entities/category.entity"

@Entity("task")
export class Task{
    @PrimaryGeneratedColumn({name:"task_id"})
    id:number

    @Column({name:"task_name"})
    name:string

    @Column({name:"status"})
    status:string
    
    @DeleteDateColumn()
    deletedAt:Date

    @ManyToOne(()=>Bucket,(bucket)=>bucket.tasks)
    @JoinColumn({name:"bucket_id"})
    bucket:Bucket

    @ManyToOne(()=>Category,(category)=>category.tasks)
    @JoinColumn({name:"category_id"})
    category:Category
      
}