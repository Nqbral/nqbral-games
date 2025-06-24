import { UserDocument } from '@app/auth/schemas/user.schema';
import { MessageErrorDocument } from '@app/message_error/schemas/message.error.schema';
import { AuthenticatedRequest } from '@app/types/authenticated.request.type';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EditMessageErrorDto } from './dto/edit.message.error.dto';

@Injectable()
export class MessageErrorService {
  constructor(
    @InjectModel('MessageError')
    private messageErrorModel: Model<MessageErrorDocument>,
    @InjectModel('User') private userModel: Model<UserDocument>,
  ) {}

  async getMessageError() {
    return await this.messageErrorModel.findOne();
  }

  async updateMessageError(
    req: AuthenticatedRequest,
    updateData: EditMessageErrorDto,
  ) {
    await this.checkUserAdmin(req.user.userId);
    const messageError = await this.messageErrorModel.findOne();

    if (messageError) {
      await this.messageErrorModel.findOneAndDelete();
    }

    await this.messageErrorModel.create(updateData);
    return { message: "Le message d'erreur est mis à jour." };
  }

  async deleteMessageError(req: AuthenticatedRequest) {
    await this.checkUserAdmin(req.user.userId);
    await this.messageErrorModel.findOneAndDelete();

    return { message: "Le message d'erreur a été supprimé." };
  }

  async checkUserAdmin(userId: string) {
    const user = await this.userModel.findById(userId).select('isAdmin');

    if (!user || (user && !user?.isAdmin)) {
      throw new UnauthorizedException('Not an administrator');
    }
  }
}
