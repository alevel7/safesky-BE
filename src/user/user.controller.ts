import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { LoggedInUser } from 'src/auth/decorators/user.decorator';
import { ILoggedInUser } from 'src/auth/dto/login-auth.dto';
import { JwtAuthGuard } from 'src/auth/guard/AuthGuard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@LoggedInUser() user: ILoggedInUser, @Param('id') id: string) {
    return user;
    return this.userService.findOne(id);
  }

  @Public()
  @Get('verify/:licenseNo')
  verifyUserExist(@Param('licenseNo') licenseNo: string) {
    return this.userService.verifyUserExist(licenseNo);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@LoggedInUser() user: ILoggedInUser, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
}
