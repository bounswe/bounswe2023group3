import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('option')
@ApiTags('poll')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Option is created successfully.' })
  @ApiResponse({ status: 409, description: 'Option already exists.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  public async create(@Body() createOptionDto: CreateOptionDto) {
    return await this.optionService.create(createOptionDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Options are fetched successfully.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Get()
  public async findAll() {
    return await this.optionService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Option is fetched successfully.' })
  @ApiResponse({ status: 404, description: 'Option not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return await this.optionService.findOne(id);
  }

  @ApiResponse({ status: 200, description: 'Options is deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Option not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return await this.optionService.remove(id);
  }

  @ApiResponse({ status: 200, description: 'All options are deleted.' })
  @ApiResponse({ status: 404, description: 'Option not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Delete()
  public async removeAll() {
    return await this.optionService.removeAll();
  }
}
