import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards, ParseIntPipe } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { GetUser } from 'src/auth/decorator/auth.decorator';
import { User } from './entities/user.entity';


@Controller('users')
@UseGuards(JwtAuthGuard) 
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Delete(':id')
  remove(@GetUser() user:User ,@Param('id',ParseIntPipe) id: string) {
    return this.userService.deleteUserById(id);
  }

}
