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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.17.0.2',
      port: 5432,
      password: 'password',
      username: 'postgres',
      entities: [User, Poll, Tag, Option,Moderator],
      database: 'postgres',
      synchronize: true,
      logging: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'esbatuhanes@gmail.com',
          pass: 'eigo ngbm jwnw liyh',
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
