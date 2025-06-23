import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageErrorDocument = MessageError & Document;

@Schema()
export class MessageError {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string;
}

export const MessageErrorSchema = SchemaFactory.createForClass(MessageError);
