import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findAll() {
    return this.stripsService.findAll();
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
