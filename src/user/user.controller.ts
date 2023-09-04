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

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Roles(Role.Admin)
    @Post()
    async create(@Body() data: CreateUserDto) {
        return this.userService.create(data);
    }
    @Roles(Role.Admin)
    @Get()
    async read() {
        return this.userService.list()
    }
    @Roles(Role.Admin)
    @Get(':id')
    async show(@ParamId() id: number) {
        return this.userService.show(id)
    }
    @Roles(Role.Admin)
    @Put(':id')
    async update(@Body() data: UpdatePutUserDto, @ParamId() id: number) {
        return this.userService.update(id, data)
    }
    @Roles(Role.Admin)
    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchUserDto, @ParamId() id: number) {
        return this.userService.updatePartial(id, data)
    }
    @Roles(Role.Admin)
    @Delete(':id')
    async delete(@ParamId() id:number) {
        return this.userService.delete(id)
    }
}