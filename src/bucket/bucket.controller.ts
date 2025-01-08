import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe,Query, UseGuards } from '@nestjs/common';
import { BucketService } from './bucket.service';
import { CreateBucketDto } from 'src/bucket/dto/create-bucket.dto';
import { query } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('buckets')
//@UseGuards(AuthGuard('jwt'))
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}
  
  @Get(':userId')

  getBucketById(@Param('userId') userId: number) {
    const result = this.bucketService.getBucketById(userId);
    return result;
  }

  @Post('create')
  createBucket(@Body() createBucketDto:CreateBucketDto) {
    const { userId, bucketName } = createBucketDto;
    return this.bucketService.createBucket(userId, bucketName);
  }

  @Put(':userId')
  updateBucketById(
    @Param('userId') userId: number,
    @Body() updateBucketDto: { bucketId: number; bucketName: string },
  ) {
    const { bucketId, bucketName } = updateBucketDto;
    return this.bucketService.updateBucketById(userId, bucketId, bucketName);
  }

  @Delete(':userId')
  deleteBucketById(
    @Param('userId',ParseIntPipe) userId: number,
    @Body() deleteBucketDto: { bucketId: number }
  ) {
    const { bucketId } = deleteBucketDto;
    return this.bucketService.deleteBucketById(userId, bucketId);
  }
  @Get()
  getBuckets(@Query('page') page: number,@Query('limit')limit:number) {
    const result = this.bucketService.getBuckets(page,limit);
    return result;
  }
}
