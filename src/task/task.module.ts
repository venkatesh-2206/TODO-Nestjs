import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bucket } from 'src/bucket/entities/bucket.entity';
import { BucketService } from 'src/bucket/bucket.service';
import { SharedModule } from 'src/common/shared/shared.module';
import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[SharedModule,AuthModule,TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([Task]),TypeOrmModule.forFeature([Bucket]),
  TypeOrmModule.forFeature([Category])],
  controllers: [TaskController],
  providers: [TaskService,BucketService],
})
export class TaskModule {}