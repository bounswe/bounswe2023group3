import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBadgeResponseDto } from './dto/responses/create-badge-response.dto';
import { GetBadgeResponseDto } from './dto/responses/get-badge-response.dto';

@ApiBearerAuth()
@Controller('badge')
@ApiTags('badge')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Badge is created successfully.', type: CreateBadgeResponseDto })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  public async create(@Body() createBadgeDto: CreateBadgeDto): Promise<CreateBadgeResponseDto> {
    return await this.badgeService.create(createBadgeDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Badges are fetched successfully.', type: [GetBadgeResponseDto] })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  public async findAll(): Promise<GetBadgeResponseDto[]> {
    return await this.badgeService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Badge is fetched successfully.', type: GetBadgeResponseDto })
  @ApiResponse({ status: 404, description: 'Badge is not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  public async findOne(@Param('id') id: string): Promise<GetBadgeResponseDto> {
    return await this.badgeService.findOne(id);
  }

  @ApiResponse({ status: 200, description: 'Badge is deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Badge is not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return await this.badgeService.remove(id);
  }
}
