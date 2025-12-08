import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginAuthDto {

    @IsString()
    @IsNotEmpty()
    readonly licenceNumber: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}

export type ILoggedInUser = {
    sub: string;
    licenceNumber: string;
    iat: number,
    exp: number,
};