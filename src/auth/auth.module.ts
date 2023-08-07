import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [JwtModule.register({
        secret: 'COA%hxdfXp84b7cIuRRpxd@J0DSR49UC'
    })]
})
export class AuthModule {

}