import {
  StatsLastHope,
  StatsShadowNetwork,
  UserDocument,
} from '@app/auth/schemas/user.schema';
import { MailService } from '@app/mail/mail.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';

import { EditPasswordDto } from './dto/edit.password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private readonly mailService: MailService,
  ) {}

  async getProfile(userId: string) {
    return this.userModel
      .findById(userId)
      .select('username email createdAt isAdmin');
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findByGoogleId(googleId: string) {
    return this.userModel.findOne({ googleId }).exec();
  }

  async updatePassword(userId: string, updateData: EditPasswordDto) {
    const hashedPassword = await bcrypt.hash(updateData.password, 10);

    return this.userModel.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true },
    );
  }

  async getStats(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('statsShadowNetwork statsLastHope');

    return {
      loveLetter: user?.statsShadowNetwork,
      lastHope: user?.statsLastHope,
    };
  }

  async updateLastHopeStats(
    userId: string,
    statsUpdate: Partial<StatsLastHope>,
  ) {
    return this.userModel.findByIdAndUpdate(
      userId,
      {
        $inc: {
          'statsLastHope.gamesPlayed': statsUpdate.gamesPlayed || 0,
          'statsLastHope.wins': statsUpdate.wins || 0,
          'statsLastHope.losses': statsUpdate.losses || 0,
        },
      },
      { new: true },
    );
  }

  async updateShadowNetworkStats(
    userId: string,
    statsUpdate: Partial<StatsShadowNetwork>,
  ) {
    return this.userModel.findByIdAndUpdate(
      userId,
      {
        $inc: {
          'statsShadowNetwork.gamesPlayed': statsUpdate.gamesPlayed || 0,
          'statsShadowNetwork.wins': statsUpdate.wins || 0,
          'statsShadowNetwork.losses': statsUpdate.losses || 0,
        },
      },
      { new: true },
    );
  }

  async deleteAccount(userId: string): Promise<void> {
    const user = await this.userModel.findById(userId);

    const result = await this.userModel.deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      throw new NotFoundException('Utilisateur non trouvé.');
    }

    if (user != null) {
      this.mailService.sendDeletionMail(user.email, user.username);
    }
  }
}
