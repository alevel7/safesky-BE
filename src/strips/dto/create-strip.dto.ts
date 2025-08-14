import { IsNotEmpty } from "class-validator";

export class CreateStripDto {

    @IsNotEmpty()
    callsign: string;

    @IsNotEmpty()
    aircraftType: string;
    
    @IsNotEmpty()
    departureAerodrome: string;

    plannedRoute: string;

    speed: string;

    @IsNotEmpty()
    arrivalAerodrome: string;

    runway: string;

    clearanceType: string; //I,V, Y, Z

    squawkCode: string;

    isArchived: boolean;

    estimatedTimeOver: string;

    actualTimeOver: string;

    timeAtTransfer: string; //Reported time at transfer

    actualTimeLeavingHold: string; //ALTH

    clearedFlightLevel: string;

    altitude: string;

    heading: string;

    estimatedTimeOfArrival: string;

    actualTimeOfArrival: string;

    expectedApproachTime: string;

    frequency: string;

    stripType: string;

    stripStatus: string;

    passengerOnBoard: number;

    clearedRoute: number;

    wakeTurbulence: string; //H, L, M, J)
}
