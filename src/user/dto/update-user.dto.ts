import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Prop } from '@nestjs/mongoose';
import { IsBoolean } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @Prop()
    @IsBoolean()
    isLoggedIn?: boolean;
}
