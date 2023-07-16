import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put} from "@nestjs/common";
import {CreateUserDto} from "./DTO/create-user.dto";
import {UpdateUserDTO} from "./DTO/update-put-user.dto";
import {UpdatePatchUserDto} from "./DTO/update-patch-user.dto";
import {UserService} from "./user.service";

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
    async update(@Body() {name, email, password}: UpdateUserDTO, @Param('id', ParseIntPipe) id) {
        return {
            method: 'put',
            name, email, password,
            id
        }
    }
    @Patch(':id')
    async updatePartial(@Body() {name, email, password}: UpdatePatchUserDto, @Param('id', ParseIntPipe) id) {
        return {
            method: 'patch',
            name, email, password,
            id
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id) {
        return {
            id
        }
    }
}