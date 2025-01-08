import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
@Module({
 
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService,JwtService],
  exports:[UserService]
})
export class UserModule {}
