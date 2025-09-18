import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StripsService } from './strips.service';
import { CreateStripDto } from './dto/create-strip.dto';
import { UpdateStripDto } from './dto/update-strip.dto';

@Controller('strips')
export class StripsController {
  constructor(private readonly stripsService: StripsService) {}

  @Post()
  create(@Body() createStripDto: CreateStripDto) {
    return this.stripsService.create(createStripDto);
  }

  @Get()
  findAll(@Query('archived') archived: boolean) {
    return this.stripsService.findAll(archived);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stripsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStripDto: UpdateStripDto) {
    return this.stripsService.update(id, updateStripDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stripsService.archive(+id);
  }
}
