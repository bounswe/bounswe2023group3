import { Controller, Get, Param, UseGuards, Req, ParseUUIDPipe } from '@nestjs/common';
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
  @Get('/my-rankings')
  @ApiResponse({ status: 200, description: 'Ranking is fetched successfully.' })
  @ApiResponse({ status: 404, description: 'Ranking is not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  findAllMyRankings(@Req() request: any) {
    return this.rankingService.findAllMyRankings(request.user.id);
  }

  @UseGuards(AuthGuard, VerificationGuard)
  @Get(':tagID')
  @ApiResponse({ status: 200, description: 'Ranking is fetched successfully.' })
  @ApiResponse({ status: 404, description: 'Ranking is not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  findAll(@Param("tagID",ParseUUIDPipe) tagID : string, @Req() request: any) {
    return this.rankingService.findAll(tagID,request.user.id);
  }




}
