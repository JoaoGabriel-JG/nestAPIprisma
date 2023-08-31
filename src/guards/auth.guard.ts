import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {AuthService} from "../auth/auth.service";
import {request} from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const { authorization } = request.headers

        try {
            const data = this.authService.checkToken((authorization ?? ''))
            request.tokenPayLoad = data

            return true
        } catch(e) {
            return false
        }
    }
}