import { Module } from '@nestjs/common';
import { ModeratorService } from './moderator.service';
import { ModeratorController } from './moderator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moderator } from './entities/moderator.entity';
import { Poll } from '../poll/entities/poll.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Moderator, Poll]),
    JwtModule.register({
      global: true,
      secret: 'very-secret-key',
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [ModeratorController],
  providers: [ModeratorService],
})
export class ModeratorModule {}
