import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PollModule } from './poll/poll.module';
import { Poll } from './poll/entities/poll.entity';
import { Tag } from './tag/entities/tag.entity';
import { Option } from './option/entities/option.entity';
import { TagModule } from './tag/tag.module';
import { OptionModule } from './option/option.module';
import { ModeratorModule } from './moderator/moderator.module';
import { Moderator } from './moderator/entities/moderator.entity';
import { BadgeModule } from './badge/badge.module';
import { Badge } from './badge/entities/badge.entity';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      password: process.env.DB_PASSWORD,
      username: 'postgres',
      entities: [User, Poll, Tag, Option, Moderator, Badge],
      database: 'postgres',
      synchronize: true,
      logging: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'esbatuhanes@gmail.com',
          pass: process.env.MAILER_SERVICE_PASSWORD,
        },
        port: 465,
        secure: true,
        tls: {
          rejectUnauthorized: false,
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
    }),
    UserModule,
    AuthModule,
    PollModule,
    TagModule,
    OptionModule,
    ModeratorModule,
    BadgeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
