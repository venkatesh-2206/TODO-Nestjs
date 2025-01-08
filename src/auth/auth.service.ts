import { Injectable} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService:UserService
     ) {}
  async register(email:string,password:string){
    const hashedPassword= await bcrypt.hash(password,10)
    const result = await this.userService.createUser(email,hashedPassword);
    return result;
  }
  async login(email:string,password:string){
    const user= await this.userService.finduser(email);
    console.log(user);
    const validPassword= await bcrypt.compare(password,user.password)
    console.log(validPassword)
    if(validPassword){
      console.log(password)
    const result = await this.userService.login(email);
    console.log(result)
    return result;
    }
  }


}