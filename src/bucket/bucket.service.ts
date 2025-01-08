import { Injectable, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bucket } from './entities/bucket.entity';
import { User } from 'src/user/entities/user.entity';
import { Response } from 'src/common/interface/responsedto';
import { SharedService } from 'src/common/shared/shared.service';



@Injectable()
export class BucketService {
  constructor(
    @InjectRepository(Bucket)
    private readonly bucketRepository: Repository<Bucket>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly sharedService:SharedService
  ) {}

  async getBucketById(userId: number): Promise<Response> {
    try {
      const result = await this.bucketRepository.find({
        select:{
          id:true,
          user:{
            id:true,
            email:true
          }
        },
        where: { user: { id: userId } },
        relations: ['user'],
      });

      if (!result.length) {
        throw new HttpException('Bucket not found for user', HttpStatus.NOT_FOUND);
      }

      return {
        status: HttpStatus.OK,
        message: 'Buckets retrieved successfully',
        result: result,
      };
    } catch (error) {
      throw new HttpException(
        `Error retrieving buckets: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  async createBucket(
    userId: number,
    bucketName: string,
  ): Promise<Response> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newBucket = this.bucketRepository.create({ name: bucketName,user});
    const savedBucket = await this.bucketRepository.save(newBucket);

    return {
      status: HttpStatus.CREATED,
      message: 'Bucket created successfully',
      result: [savedBucket],
    };
  }

  async updateBucketById(
    userId: number,
    bucketId: number,
    bucketName: string,
  ): Promise<Response> {
    const bucket = await this.bucketRepository.findOne({
      where: { id: bucketId, user: { id: userId } },
      relations: ['user'],
    });

    if (!bucket) {
      throw new HttpException('Bucket not found', HttpStatus.NOT_FOUND);
    }

    bucket.name = bucketName;
    const updatedBucket = await this.bucketRepository.save(bucket);

    return {
      status: HttpStatus.OK,
      message: 'Bucket updated successfully',
      result: [updatedBucket],
    };
  }

  async deleteBucketById(
    userId: number,
    bucketId: number,
  ): Promise<Response> {
    const bucket = await this.bucketRepository.findOne({
      where: { id: bucketId, user: { id: userId } },
      relations: ['user'],
    });

    if (!bucket) {
      throw new HttpException('Bucket not found', HttpStatus.NOT_FOUND);
    }

    await this.bucketRepository.softRemove(bucket);

    return {
      status: HttpStatus.OK,
      message: 'Bucket deleted successfully',
      result: [bucket],
    };
  }
  async getBuckets(page:number,limit:number):Promise<Response>{
    const bucket= await this.bucketRepository.find();
    return this.sharedService.pagination(bucket,page,limit);
  }
}
