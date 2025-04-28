import { LoginDto } from '@app/auth/dto/login.dto';
import { RegisterDto } from '@app/auth/dto/register.dto';
import { User, UserDocument } from '@app/auth/schemas/user.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;

    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      throw new BadRequestException('Username ou Email déjà pris');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    return { message: 'Compte créé avec succès' };
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new BadRequestException('Identifiants invalides');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Identifiants invalides');
    }

    const payload = { sub: user._id, username: user.username };
    const token = await this.jwtService.signAsync(payload);

    return { token };
  }
}
