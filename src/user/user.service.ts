import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "./DTO/create-user.dto";
import {PrismaService} from "../prisma/prisma.service";

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
}

