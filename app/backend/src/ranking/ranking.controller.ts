import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

@ApiBearerAuth()
@Controller('ranking')
@ApiTags('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get(':name')
  @ApiResponse({ status: 200, description: 'Ranking is fetched successfully.' })
  @ApiResponse({ status: 404, description: 'Ranking is not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  findAll(@Param("name") name : string) {
    return this.rankingService.findAll(name);
  }


}
