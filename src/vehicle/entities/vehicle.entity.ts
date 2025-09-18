import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Vehicle extends Document {
    @Prop({ required: true })
    vehicleType: string;

    @Prop({ required: true })
    columnB: string;

    @Prop({ required: true })
    columnC: string;

    @Prop({ required: true })
    columnD: string;

    @Prop()
    stripStatus: string;

    @Prop({default: false})
    isArchived: boolean;

    @Prop({default: 'vehicle'})
    stripType: string;

    }

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
