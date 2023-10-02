import { APP_GUARD } from "@nestjs/core";
import {forwardRef, Module, UseGuards} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth/auth.module";
import {ThrottlerGuard, ThrottlerModule} from "@nestjs/throttler";
import {ConfigModule} from "@nestjs/config";
import {MailerModule} from "@nestjs-modules/mailer";
import {PugAdapter} from "@nestjs-modules/mailer/dist/adapters/pug.adapter";

@Module({
  imports: [
      ConfigModule.forRoot(),
      ThrottlerModule.forRoot([{
        ttl: 60000,
        limit: 10,
      }]),
      forwardRef(() => UserModule),
      forwardRef(() => AuthModule),
      MailerModule.forRoot({
          transport: {
              host: 'smtp.ethereal.email',
              port: 587,
              auth: {
                  user: 'dortha33@ethereal.email',
                  pass: 'sS52kRvCrPxMb69vvb'
              }
          },
          defaults: {
              from: '"jgMailTest" <dortha33@ethereal.email>',
          },
          template: {
              dir: __dirname + '/templates',
              adapter: new PugAdapter(),
              options: {
                  strict: true,
              },
          },
      }),
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
  exports: [AppService],
})
export class AppModule {}
