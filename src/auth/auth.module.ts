import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './stratergy/auth.jwtstatergy';

@Module({
  imports:[UserModule,JwtModule.register({
    secret: 'Venkat22',
    signOptions: { expiresIn: '1h' },
    })],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
})
export class AuthModule {}
