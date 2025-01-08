import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bucket } from '../bucket/entities/bucket.entity';
import { Task } from '../task/entities/task.entity'; 
import { User } from '../user/entities/user.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Bucket)
    private readonly bucketRepository: Repository<Bucket>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getDashboard() {
    try {
      
      const totalUsers = await this.userRepository.count();
      const totalTasks = await this.taskRepository.count();
      const totalBuckets = await this.bucketRepository.count();
      const completedTasks = await this.taskRepository.count({
        where: { status: 'completed' }});

      const pendingTasks = await this.taskRepository.count({
        where: { status: 'pending' }});

      const inProgressTasks = await this.taskRepository.count({
        where: { status: 'in-progress' }});

      return {totalUsers,totalTasks,totalBuckets,completedTasks,pendingTasks,inProgressTasks};
    } catch (error) {
      throw new HttpException('Error fetching global dashboard stats', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
