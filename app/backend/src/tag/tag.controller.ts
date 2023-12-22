import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTagResponseDto } from './dto/responses/create-tag-response.dto';
import { GetTagResponseDto } from './dto/responses/get-tag-response.dto';
import { ModeratorGuard } from '../moderator/guards/moderator.guard';
import { VerificationModeratorGuard } from '../moderator/guards/verification-moderator.guard';

@ApiBearerAuth()
@Controller('tag')
@ApiTags('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @UseGuards(ModeratorGuard, VerificationModeratorGuard)
  @ApiResponse({ status: 201, description: 'Tag is created successfully.', type: CreateTagResponseDto })
  @ApiResponse({ status: 400, description: 'Tag must be unique.'})
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  public async create(@Body() createTagDto: CreateTagDto): Promise<CreateTagResponseDto> {
    return await this.tagService.create(createTagDto);
  }
  @Get()
  @ApiResponse({ status: 200, description: 'Tags are fetched successfully.', type: [GetTagResponseDto] })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  public async findAll(): Promise<GetTagResponseDto[]> {
    return await this.tagService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Tag is fetched successfully.', type: GetTagResponseDto })
  @ApiResponse({ status: 404, description: 'Tag is not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  public async findOne(@Param('id') id: string): Promise<GetTagResponseDto> {
    return await this.tagService.findOne(id);
  }

  @ApiResponse({ status: 200, description: 'Tags are deleted successfully.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Delete('')
  public async removeAll() {
    return await this.tagService.removeAll();
  }

  @ApiResponse({ status: 200, description: 'Tag is deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Tag is not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return await this.tagService.remove(id);
  }
}
