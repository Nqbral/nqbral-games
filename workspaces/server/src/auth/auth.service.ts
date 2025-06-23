import { LoginDto } from '@app/auth/dto/login.dto';
import { RegisterDto } from '@app/auth/dto/register.dto';
import { User, UserDocument } from '@app/auth/schemas/user.schema';
import { MailService } from '@app/mail/mail.service';
import { UserService } from '@app/user/user.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
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
    private readonly mailService: MailService,
    private readonly userService: UserService,
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

    const payload = {
      sub: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    this.mailService
      .sendWelcome(user.email, user.username)
      .catch((e) => console.error('Erreur envoi mail de bienvenue', e));

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      username: user.username,
      isAdmin: user.isAdmin,
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

    const payload = {
      sub: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      username: user.username,
      isAdmin: user.isAdmin,
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

  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) return;

    const token = this.jwtService.sign({ sub: user.id }, { expiresIn: '15m' });

    await this.mailService.sendPasswordReset(user.email, user.username, token);
    return { message: 'Email de réinitialisation envoyé' };
  }

  async resetPassword(token: string, password: string) {
    try {
      const payload = this.jwtService.verify(token);

      await this.userService.updatePassword(payload.sub, {
        password: password,
      });

      return { message: 'Mot de passe mis à jour' };
    } catch {
      throw new UnauthorizedException('Token invalide ou expiré');
    }
  }
}
