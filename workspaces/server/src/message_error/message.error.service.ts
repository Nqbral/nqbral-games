import { MessageErrorDocument } from '@app/message_error/schemas/message.error.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EditMessageErrorDto } from './dto/edit.message.error.dto';

@Injectable()
export class MessageErrorService {
  constructor(
    @InjectModel('MessageError')
    private messageErrorModel: Model<MessageErrorDocument>,
  ) {}

  async getMessageError() {
    return await this.messageErrorModel.findOne();
  }

  async updateMessageError(updateData: EditMessageErrorDto) {
    const messageError = await this.messageErrorModel.findOne();

    if (messageError) {
      await this.messageErrorModel.findOneAndUpdate(updateData);
      return { message: "Le message d'erreur est mis à jour." };
    }

    await this.messageErrorModel.create(updateData);
    return { message: "Le message d'erreur est mis à jour." };
  }

  async deleteMessageError() {
    await this.messageErrorModel.findOneAndDelete();

    return { message: "Le message d'erreur a été supprimé." };
  }
}
