import { Entity, PrimaryGeneratedColumn, Column, OneToMany,DeleteDateColumn } from "typeorm";
import { Bucket } from "src/bucket/entities/bucket.entity";
import { Role } from "src/enum/enum";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn({ name: "user_id" })
  id: number;

  @Column({ name: "user_email" ,nullable:true})
  email: string;

  @Column({ name: "user_password" })
  password: string;

  @Column({name:'user_role',type:'enum',enum:Role,default:'user'})
  role:Role;

  @DeleteDateColumn({name:"deleted"})
  deletedAt: Date 

  @OneToMany(()=>Bucket,(bucket)=>bucket.user,{cascade:true})
  bucket:Bucket[]
}
