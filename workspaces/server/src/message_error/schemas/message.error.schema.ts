import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageErrorDocument = MessageError & Document;

@Schema()
export class MessageError {
  @Prop({ required: true, maxlength: 52 })
  title: string;

  @Prop({ required: true, maxlength: 256 })
  message: string;
}

export const MessageErrorSchema = SchemaFactory.createForClass(MessageError);
