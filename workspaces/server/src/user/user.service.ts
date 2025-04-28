import { UserDocument } from '@app/auth/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async getProfile(userId: string) {
    return this.userModel.findById(userId).select('username email createdAt');
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
