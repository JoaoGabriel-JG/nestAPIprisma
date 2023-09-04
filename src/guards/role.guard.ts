import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {AuthService} from "../auth/auth.service";
import {request} from "express";
import {UserService} from "../user/user.service";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "../decorators/role.decorator";
import {Role} from "../enums/role.enum";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [context.getHandler, context.getClass] )

        if(!requiredRoles) {
            return true
        }

        const {user} = context.switchToHttp().getRequest()

        return true
    }
}