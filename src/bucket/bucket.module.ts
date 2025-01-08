import { Module } from '@nestjs/common';
import { BucketService } from './bucket.service';
import { BucketController } from './bucket.controller';
import { UserService } from 'src/user/user.service';
import { Bucket } from './entities/bucket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { SharedModule } from 'src/common/shared/shared.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[SharedModule,TypeOrmModule.forFeature([Bucket]),TypeOrmModule.forFeature([User])],
  controllers: [BucketController],
  providers: [BucketService,UserService,JwtService],
  exports:[BucketService]
})
export class BucketModule {}
