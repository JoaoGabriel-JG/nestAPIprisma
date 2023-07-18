import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors} from "@nestjs/common";
import {CreateUserDto} from "./DTO/create-user.dto";
import {UpdatePutUserDto} from "./DTO/update-put-user.dto";
import {UpdatePatchUserDto} from "./DTO/update-patch-user.dto";
import {UserService} from "./user.service";
import {LogInterceptor} from "../Interceptors/log.interceptor";

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
    async show(@Param('id', ParseIntPipe) id: number) {
        return this.userService.show(id)
    }
    @Put(':id')
    async update(@Body() data: UpdatePutUserDto, @Param('id', ParseIntPipe) id) {
        return this.userService.update(id, data)
    }
    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchUserDto, @Param('id', ParseIntPipe) id) {
        return this.userService.updatePartial(id, data)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id) {
        return this.userService.delete(id)
    }
}