import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('badge')
@ApiTags('badge')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Badge is created successfully.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  create(@Body() createBadgeDto: CreateBadgeDto) {
    return this.badgeService.create(createBadgeDto);
  }

  @ApiResponse({ status: 200, description: 'Badges are fetched successfully.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Get()
  findAll() {
    return this.badgeService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Badge is fetched successfully.' })
  @ApiResponse({ status: 404, description: 'Badge is not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.badgeService.findOne(id);
  }

  @ApiResponse({ status: 200, description: 'Badge is deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Badge is not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.badgeService.remove(id);
  }
}
