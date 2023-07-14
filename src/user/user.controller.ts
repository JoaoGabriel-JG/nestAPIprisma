import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put} from "@nestjs/common";
import {CreateUserDto} from "./DTO/create-user.dto";
import {UpdateUserDTO} from "./DTO/update-put-user.dto";
import {UpdatePatchUserDto} from "./DTO/update-patch-user.dto";

@Controller('users')
export class UserController {
    @Post()
    async create(@Body() {name, email, password}: CreateUserDto) {
        return {name, email, password};
    }
    @Get()
    async read() {
        return {users:[]}
    }
    @Get(':id')
    async show(@Param('id', ParseIntPipe) id) {
        return {user:{}, id}
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