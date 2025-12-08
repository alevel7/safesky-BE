import { IsNotEmpty, IsString, MinLength, minLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    licenceNumber: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    @MinLength(8)
    @IsString()
    confirmPassword: string;


    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;
}
