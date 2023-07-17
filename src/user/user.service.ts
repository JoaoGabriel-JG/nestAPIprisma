import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "./DTO/create-user.dto";
import {PrismaService} from "../prisma/prisma.service";
import {UpdatePutUserDto} from "./DTO/update-put-user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}
    async create(data: CreateUserDto) {
        return this.prisma.user.create({
            data
        });
    }

    async list() {
        return this.prisma.user.findMany();
    }

    async show(id: number) {
        return this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    async update(id: number, data: UpdatePutUserDto) {
        return this.prisma.user.update({
            data: {
                
            },
            where {
                id
            }
        })
    }
}

