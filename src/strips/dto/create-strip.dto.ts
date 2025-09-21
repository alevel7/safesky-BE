import { IsBoolean, IsDecimal, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStripDto {

    @IsNotEmpty()
    callsign: string;

    @IsNotEmpty()
    aircraftType: string;
    
    @IsNotEmpty()
    departureAerodrome: string;

    @IsString()
    plannedRoute: string;

    @IsNumber()
    speed: number;

    @IsNotEmpty()
    arrivalAerodrome: string;

    @IsString()
    runway: string;

    @IsString()
    clearanceType: string; //I,V, Y, Z

    @IsString()
    squawkCode: string;

    @IsBoolean()
    isArchived: boolean;

    @IsString()
    estimatedTimeOver: string;

    @IsString()
    actualTimeOver: string;

    @IsString()
    timeAtTransfer: string; //Reported time at transfer

    @IsString()
    actualTimeLeavingHold: string; //ALTH

    @IsString()
    clearedFlightLevel: string;

    @IsNumber()
    altitude: number;

    @IsNumber()
    heading: number;

    @IsString()
    estimatedTimeOfArrival: string;

    @IsString()
    actualTimeOfArrival: string;

    @IsString()
    expectedApproachTime: string;

    @IsNumber()
    frequency: number;

    @IsString()
    stripType: string;

    @IsString()
    stripStatus: string;

    @IsNumber()
    passengerOnBoard: number;
    
    @IsString()
    @IsNotEmpty()
    aircraftRegistration: string;

    @IsString()
    wakeTurbulence: string; //H, L, M, J)
}
