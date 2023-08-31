import {CreateUserDto} from "../../user/DTO/create-user.dto";
import {IsEmail} from "class-validator";

export class AuthForgetDto {
    @IsEmail()
    email: string
}