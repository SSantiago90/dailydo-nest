import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
 
 
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    console.log("roles", role)
    
    if (!role)  return true

    const { user } = context.switchToHttp().getRequest();
    return role === user.role
  }
}
