import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// create a schema for subscriber
@Schema()
export class Block extends Document{
    @Prop()
    chatId: string
}

export const BlockSchema = SchemaFactory.createForClass(Block);