import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Strip extends Document {
    @Prop({ required: true })
    callsign: string;

    @Prop()
    aircraftType: string;

    @Prop({ required: true })
    departureAerodrome: string;

    @Prop()
    plannedRoute: string;

    @Prop()
    speed: string;

    @Prop()
    arrivalAerodrome: string;

    @Prop()
    runway: string;

    @Prop()
    clearanceType: string; //I,V, Y, Z

    @Prop()
    squawkCode: string;

    @Prop({default: false})
    isArchived: boolean;

    @Prop()
    estimatedTimeOver: string;

    @Prop()
    actualTimeOver: string;

    @Prop()
    timeAtTransfer: string; //Reported time at transfer

    @Prop()
    actualTimeLeavingHold: string; //ALTH

    @Prop()
    clearedFlightLevel: string;

    @Prop()
    altitude: string;

    @Prop()
    heading: string;

    @Prop()
    estimatedTimeOfArrival: string;

    @Prop()
    actualTimeOfArrival: string;

    @Prop()
    expectedApproachTime: string;

    @Prop()
    frequency: string;
    
    @Prop()
    stripType: string;

    @Prop()
    stripStatus: string;

    @Prop()
    passengerOnBoard: number;

    @Prop()
    clearedRoute: number;

    @Prop()
    wakeTurbulence: string; //H, L, M, J)


    @Prop({ default: Date.now })
    createdAt: Date;
}
export const StripSchema = SchemaFactory.createForClass(Strip);
