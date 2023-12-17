import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('ranking')
@ApiTags('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get(':id')
  findAll(@Param("id") id : string) {
    return this.rankingService.findAll(id);
  }


}
