import { User, UserSchema } from '@app/auth/schemas/user.schema';
import {
  MessageError,
  MessageErrorSchema,
} from '@app/message_error/schemas/message.error.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MessageErrorController } from './message.error.controller';
import { MessageErrorService } from './message.error.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MessageError.name, schema: MessageErrorSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [MessageErrorController],
  providers: [MessageErrorService],
})
export class MessageErrorModule {}
