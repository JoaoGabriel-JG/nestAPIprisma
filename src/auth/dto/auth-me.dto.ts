import {IsJWT} from "class-validator";

export class AuthMetDto {
    @IsJWT()
    token: string
}