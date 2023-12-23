import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { VerificationGuard } from '../auth/guards/verification.guard';

@ApiBearerAuth()
@Controller('ranking')
@ApiTags('ranking')

export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @UseGuards(AuthGuard, VerificationGuard)
  @Get(':name')
  @ApiResponse({ status: 200, description: 'Ranking is fetched successfully.' })
  @ApiResponse({ status: 404, description: 'Ranking is not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  findAll(@Param("name") name : string, @Req() request: any) {
    return this.rankingService.findAll(name,request.user.id);
  }


}
