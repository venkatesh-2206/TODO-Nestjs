import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ExecutionContext,CanActivate } from "@nestjs/common";
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private allowedRole: string) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.role) {
      throw new HttpException('No role defined for user',HttpStatus.BAD_REQUEST);
    }

    if (user.role !==this.allowedRole) {
      throw new HttpException('You do not have permission to access this resource',HttpStatus.BAD_REQUEST);
    }

    return true;
  }
}