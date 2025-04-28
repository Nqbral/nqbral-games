import { UserDocument } from '@app/auth/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';

import { EditPasswordDto } from './dto/edit.password.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async getProfile(userId: string) {
    return this.userModel.findById(userId).select('username email createdAt');
  }

  async updatePassword(userId: string, updateData: EditPasswordDto) {
    const hashedPassword = await bcrypt.hash(updateData.password, 10);

    return this.userModel.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true },
    );
  }

  async updateProfile(userId: string, updateData: any) {
    return this.userModel.findByIdAndUpdate(userId, updateData, { new: true });
  }

  async getStats(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('statsLoveLetter statsLastHope');

    return {
      loveLetter: user?.statsLoveLetter,
      lastHope: user?.statsLastHope,
    };
  }
}
