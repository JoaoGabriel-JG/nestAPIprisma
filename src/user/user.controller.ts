import {Body, Controller, Delete, Get, Patch, Post, Put, UseGuards, UseInterceptors} from "@nestjs/common";
import {CreateUserDto} from "./DTO/create-user.dto";
import {UpdatePutUserDto} from "./DTO/update-put-user.dto";
import {UpdatePatchUserDto} from "./DTO/update-patch-user.dto";
import {UserService} from "./user.service";
import {LogInterceptor} from "../Interceptors/log.interceptor";
import {ParamId} from "../decorators/param-id.decorator";
import {Roles} from "../decorators/role.decorator";
import {Role} from "../enums/role.enum";
import {RoleGuard} from "../guards/role.guard";
import {AuthGuard} from "../guards/auth.guard";
import {ThrottlerGuard} from "@nestjs/throttler";

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post()
    async create(@Body() data: CreateUserDto) {
        return this.userService.create(data);
    }
    @Get()
    async read() {
        return this.userService.list()
    }
    @Get(':id')
    async show(@ParamId() id: number) {
        return this.userService.show(id)
    }
    @Put(':id')
    async update(@Body() data: UpdatePutUserDto, @ParamId() id: number) {
        return this.userService.update(id, data)
    }
    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchUserDto, @ParamId() id: number) {
        return this.userService.updatePartial(id, data)
    }
    @Delete(':id')
    async delete(@ParamId() id:number) {
        return this.userService.delete(id)
    }
}