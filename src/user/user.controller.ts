import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
//import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { GetUser } from 'src/auth/decorator/auth.decorator';
import { User } from './entities/user.entity';
import { RoleGuard } from 'src/auth/guard/auth.roleguard';


@Controller('users')
@UseGuards(JwtAuthGuard) 
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @UseGuards(new RoleGuard('admin'))
  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @Delete(':id')
  remove(@GetUser() user:User ,@Param('id') id: string) {
    console.log(user);
    
    if(user.id!==+id){
      throw new HttpException('you can able to delte your only',HttpStatus.BAD_REQUEST)
    }
    return this.userService.deleteUserById(+id);
  }

}
