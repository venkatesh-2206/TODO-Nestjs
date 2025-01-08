import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';


@Controller('users')
@UseGuards(JwtAuthGuard) 
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUserById(+id);
  }

}
