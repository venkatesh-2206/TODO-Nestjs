import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe,Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Response } from 'src/common/interface/responsedto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':bucketId')
  async getTaskById(@Param('bucketId') bucketId: number): Promise<Response> {
    return this.taskService.getTaskById(bucketId);
  }

  @Post('create')
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Response> {
    return this.taskService.createTask(createTaskDto);
  }

  @Put(':bucketId')
  async updateTaskById(
    @Param('bucketId') bucketId: number,
    @Body() updateTaskDto:UpdateTaskDto
  ): Promise<Response> {
    return this.taskService.updateTaskById(bucketId, updateTaskDto);
  }

  @Delete(':bucketId')
  async deleteTaskById(
    @Param('bucketId',ParseIntPipe) bucketId: number,
    @Body() Body:{taskId:number}
     ): Promise<Response> {
      const {taskId}=Body;
    return this.taskService.deleteTaskById(bucketId,taskId);
  }
  @Get('/bin')
  async  getSoftDeletedTask(): Promise<Response> {
    return this.taskService. getSoftDeletedTasks();
  }
   @Get()
    gettasks(@Query('page') page: number,@Query('limit')limit:number) {
      //console.log(page,limit);
      const result = this.taskService.gettasks(page,limit);
      return result;
    }
}
