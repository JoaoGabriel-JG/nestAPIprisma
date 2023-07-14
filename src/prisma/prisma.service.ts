import {INestApplication, Injectable, OnModuleInit} from "@nestjs/common";
import {PrismaClient} from "@prisma/client";
import * as process from "process";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit(){
        await this.$connect()
    }

    async enabledShutDownHooks(app: INestApplication) {
        process.on('beforeExit', async () => {
            await app.close()
        })
    }
}