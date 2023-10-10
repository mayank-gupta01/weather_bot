import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// create a schema for subscriber
@Schema()
export class Admin extends Document{
    @Prop()
    emailId: string
}

export const AdminSchema = SchemaFactory.createForClass(Admin);