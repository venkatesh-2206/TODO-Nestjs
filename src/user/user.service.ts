import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'src/common/interface/responsedto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService:JwtService
  ) {}

  async finduser(email:string){
    const user=await this.userRepository.findOne({ where: {email} });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
       }
    return user;
  }
  async login(email:string): Promise<Response> {

    try {
      const user = await this.userRepository.findOne({
        where: {email}
        });
        console.log(user);

      if (!user) {
       throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const payload = { email: user.email, sub: user.id };
        console.log(payload)
        const token = this.jwtService.sign(payload,{secret:'venkat22'});
        console.log(token)
      return {
        status: HttpStatus.CREATED,
        message: 'User Retrived successfully',
        result:[{"userId":user.id,"user_email":user.email,"Token":token}]
    };
    } catch (error) {
      throw new HttpException(
        'An error occurred while processing your request.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createUser(email:string,password:string): Promise<Response> {
    try {
      const user= await this.userRepository.findOne({ where: { email } });
    if(user){
      throw new HttpException("user already exist",HttpStatus.CONFLICT);
    }
      const newUser = this.userRepository.create({ email, password });
      await this.userRepository.save(newUser);

      return {
        status: HttpStatus.CREATED,
        message: 'User created successfully',
        result: [{
          id: newUser.id,
          email: newUser.email,
        }],
      };
    } catch (error) {
      throw new HttpException(
        `An error occurred while creating the user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUserById(userId: number): Promise<Response> {
    try {
      const user = await this.userRepository.findOne({where:{id:userId}});

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      await this.userRepository.softRemove(user);
      return {
        status: HttpStatus.OK,
        message: 'User deleted successfully',
        result:[]
      };
    } catch (error) {
      throw new HttpException(
        `An error occurred while deleting the user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
