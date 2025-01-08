import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { Bucket } from 'src/bucket/entities/bucket.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Bucket]),TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([Task])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
