import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService
  ) {
    super({
       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
       secretOrKey: 'venkat22',
    });
  }

  async validate(payload: any) {
     const user = await this.userService.finduser(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}