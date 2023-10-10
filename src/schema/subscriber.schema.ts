import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// create a schema for subscriber
@Schema()
export class Subscriber extends Document{
    @Prop()
    firstName: string

    @Prop({default:""})
    lastName: string

    @Prop()
    chatId: string
}

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);