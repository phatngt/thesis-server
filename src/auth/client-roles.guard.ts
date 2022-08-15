import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from 'src/constants/decorator';
import { ROLES_KEY } from "./client-roles.decorator";

@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly reflector: Reflector) { super(); }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
