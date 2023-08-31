import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {AuthController} from "./auth.controller";
import {UserModule} from "../user/user.module";
import {PrismaModule} from "../prisma/prisma.module";
import {AuthService} from "./auth.service";

@Module({
    imports: [JwtModule.register({
        secret: 'COA%hxdfXp84b7cIuRRpxd@J0DSR49UC'
    }),
        UserModule,
        PrismaModule
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {

}