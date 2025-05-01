import { LoginDto } from '@app/auth/dto/login.dto';
import { RegisterDto } from '@app/auth/dto/register.dto';
import { User, UserDocument } from '@app/auth/schemas/user.schema';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

    const payload = { sub: user._id, username: user.username };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      username: user.username,
    };
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

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      username: user.username,
    };
  }

  async refreshToken(refreshToken: string) {
    const token = refreshToken;

    if (!token) throw new UnauthorizedException();

    const payload = this.jwtService.verify(token);
    const newAccessToken = this.jwtService.sign(
      { sub: payload.sub },
      { expiresIn: '15m' },
    );

    return { accessToken: newAccessToken };
  }

  async verifyToken(token: string) {
    try {
      const decoded = this.jwtService.decode(token);

      if (!decoded) {
        throw new UnauthorizedException('Invalid token');
      }

      const user = await this.userModel.findOne({ _id: decoded['sub'] });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
