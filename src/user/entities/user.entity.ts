import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    licenceNumber: string;

    @Prop({select: false})
    password: string;

    // add a createAT timestamp into this mongoose document
    @Prop({ default: Date.now })
    createdAt: Date;

}
export const UserSchema = SchemaFactory.createForClass(User);