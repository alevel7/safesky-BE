import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { StripsService } from './strips.service';
import { CreateStripDto } from './dto/create-strip.dto';
import { UpdateStripDto } from './dto/update-strip.dto';
import { OptionalAuthGuard } from 'src/auth/guard/OptionalAuthGuard';
import { OptionalUser } from 'src/auth/decorators/optional-user.decorator';
import { ILoggedInUser } from 'src/auth/dto/login-auth.dto';
import { actionType, activityType } from './dto/activity.dto';

@Controller('strips')
export class StripsController {
  constructor(private readonly stripsService: StripsService) {}

  @Post()
  create(@OptionalUser() user: ILoggedInUser | null, @Body() createStripDto: CreateStripDto) {
    return this.stripsService.create(user, createStripDto);
  }

  @Get()
  findAll(@Query('archived') archived: boolean) {
    return this.stripsService.findAll(archived);
  }


  @Patch(':id')
  @UseGuards(OptionalAuthGuard)
  update(@OptionalUser() user: ILoggedInUser | null , @Param('id') id: string, @Body() updateStripDto: UpdateStripDto) {
    return this.stripsService.update(id, updateStripDto, user);
  }

  @Get('/audit-logs')
  @UseGuards(OptionalAuthGuard)
  getAuditLogs(
    @OptionalUser() user: ILoggedInUser | null, 
    @Query('page') page: number, 
    @Query('limit') limit: number,
    @Query('type') type: activityType,
    @Query('action') action: actionType,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    // Implementation for fetching audit logs can be added here
    return this.stripsService.getAuditLogs( user, page, limit, type, action, startDate, endDate);
  }
}
