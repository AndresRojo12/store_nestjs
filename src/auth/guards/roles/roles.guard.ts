import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../../decorators/roles.decorator';
import { TokenPayload } from '../../models/token.models';
import { Role } from '../../models/roles.model'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if(!roles){
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as TokenPayload;
    const isAuth = roles.some((roles) => roles === user.role);
    if(!isAuth){
      throw new UnauthorizedException('no allow');
    }
    return isAuth;
  }
}
