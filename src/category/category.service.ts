import { Injectable, InternalServerErrorException} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { HttpStatus,HttpException } from '@nestjs/common';
import { Response } from 'src/common/interface/responsedto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
  ){}
  

  async findAll(): Promise<Response> {
      try {
        const catgories = await this.categoryRepository.find({select:{id:true,name:true}});
  
        if (catgories.length === 0) {
          throw new HttpException(' Categories not found ', HttpStatus.NOT_FOUND);
        }
  
        return {
           status:HttpStatus.OK, message: 'Tasks retrieved successfully', result: catgories };
      } catch (err) {
        throw new InternalServerErrorException(`Error retrieving tasks: ${err.message}`);
      }
    }
  }

