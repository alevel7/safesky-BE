import { IsBoolean, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateStripDto {

    @IsNotEmpty()
    callsign: string;

    @IsOptional()
    @IsString()
    aircraftType: string;
    
    @IsNotEmpty()
    departureAerodrome: string;

    @IsString()
    @IsOptional()
    plannedRoute: string;

    @IsNumber()
    @IsOptional()
    speed: number;

    @IsNotEmpty()
    @IsOptional()
    arrivalAerodrome: string;

    @IsOptional()
    @IsString()
    runway: string;

    @IsOptional()
    @IsString()
    clearanceType: string; //I,V, Y, Z

    @IsOptional()
    @IsString()
    squawkCode: string;

    @IsOptional()
    @IsBoolean()
    isArchived: boolean;

    // @IsString()
    // estimatedTimeOver: string;

    // @IsString()
    // actualTimeOver: string;

    @IsOptional()
    @IsString()
    timeAtTransfer: string; //Reported time at transfer

    @IsString()
    actualTimeLeavingHold: string; //ALTH

    // @IsString()
    // clearedFlightLevel: string;

    @IsOptional()
    @IsNumber()
    altitude: number;

    @IsOptional()
    @IsNumber()
    heading: number;

    @IsString()
    estimatedTimeOfArrival: string;

    @IsString()
    actualTimeOfArrival: string;

    @IsOptional()
    @IsString()
    requestedTrackTime:string;

    @IsOptional()
    @IsString()
    reportedIntersectionTime:string;

    @IsString()
    expectedApproachTime: string;

    @IsOptional()
    @IsString()
    timeOfClearance: string;

    @IsOptional()
    @IsString()
    startTime: string;

    @IsOptional()
    @IsString()
    deliveredTime: string;

    @IsOptional()
    @IsString()
    frequency: number;

    @IsString()
    stripType: string;

    @IsString()
    stripStatus: string;

    @IsOptional()
    @IsNumber()
    passengerOnBoard: number;
    
    @IsString()
    @IsNotEmpty()
    aircraftRegistration: string;

    @IsString()
    wakeTurbulence: string; //H, L, M, J)
}
