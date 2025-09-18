import { IsString } from "class-validator";

export class CreateVehicleDto {
    @IsString()
    vehicleType: string;

    @IsString()
    columnB: string;

    @IsString()
    columnC: string;

    @IsString()
    columnD: string;

    @IsString()
    stripStatus: string;
}
