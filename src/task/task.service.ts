import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,Not,IsNull } from 'typeorm';
import { Task } from 'src/task/entities/task.entity';
import { Bucket } from 'src/bucket/entities/bucket.entity';
import { Response } from 'src/common/interface/responsedto';
import { HttpStatus,HttpException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SharedService } from 'src/common/shared/shared.service';
import { resfunction } from 'src/common/resfunction/resfunction';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository:Repository<Category>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Bucket)
    private readonly bucketRepository: Repository<Bucket>,
    private readonly sharedService:SharedService
  ) {}

  async getTaskById(bucketId: number): Promise<Response> {
    try {
      const tasks = await this.taskRepository.find({select:{id:true,name:true},
        where: { bucket: { id: bucketId } },
        relations: ['bucket'],
      });

      if (tasks.length === 0) {
        throw new HttpException('Bucket not found for user', HttpStatus.NOT_FOUND);
      }

      return { status:HttpStatus.OK, message: 'Tasks retrieved successfully', result: tasks };
    } catch (err) {
      throw new InternalServerErrorException(`Error retrieving tasks: ${err.message}`);
    }
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Response> {
    try {

      const { bucketId,task, status,categoryId } = createTaskDto;
      const bucket = await this.bucketRepository.findOne({ where: { id: bucketId } });

      if (!bucket) {
        throw new HttpException('Bucket not found for user', HttpStatus.NOT_FOUND);
      }
      const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
      
      if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }

      const newTask = this.taskRepository.create({ name: task, status,bucket,category });
      await this.taskRepository.save(newTask);

      return { status: HttpStatus.CREATED, message: 'Task added successfully', result: [] };
    } catch (err) {
      throw new InternalServerErrorException(`Error adding task: ${err.message}`);
    }
  }

  async updateTaskById(
    bucketId: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Response> {
    try {
      const { taskId, task, status } = updateTaskDto;

      const existingTask = await this.taskRepository.findOne({
        where: { id: taskId, bucket: { id: bucketId } },
        relations: ['bucket'],
      });

      if (!existingTask) {
        throw new HttpException('Task not found for user', HttpStatus.NOT_FOUND);
      }

      existingTask.name = task;
      existingTask.status = status;
      await this.taskRepository.save(existingTask);

      return { status:HttpStatus.OK, message: 'Task updated successfully', result:[] };
    } catch (err) {
      throw new InternalServerErrorException(`Error updating task: ${err.message}`);
    }
  }

  async deleteTaskById(bucketId: number, taskId:number): Promise<Response> {
    try {
       const existingTask = await this.taskRepository.findOne({
        where: { id: taskId, bucket: { id: bucketId } },
        relations: ['bucket'],
      });

      if (!existingTask) {
        throw new HttpException('Task not found for user', HttpStatus.NOT_FOUND);
      }

      await this.taskRepository.softRemove(existingTask);

      return { status:HttpStatus.OK, message: 'Task deleted successfully', result: [] };
    } catch (err) {
      throw new InternalServerErrorException(`Error deleting task: ${err.message}`);
    }
  }
  async getSoftDeletedTasks(): Promise<Response> {
    try {
      const tasks = await this.taskRepository.find({
        withDeleted: true,  
        where: {
          deletedAt: Not(IsNull()), 
        },
      });
 // return resfunction(HttpStatus.OK,'fetched softdeleted task successfully',tasks);
      return {
        status: HttpStatus.OK,
        message: 'Fetched soft-deleted tasks successfully',
        result: tasks,
      };
    } catch (error) {
      throw new HttpException(
        `An error occurred while fetching soft-deleted tasks: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  async gettasks(page:number,limit:number):Promise<Response>{
    //console.log(page,limit);
    const tasks= await this.taskRepository.find();
    return this.sharedService.pagination(tasks,page,limit);
  }
}
