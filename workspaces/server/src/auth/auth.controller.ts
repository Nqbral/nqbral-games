import { AuthService } from '@app/auth/auth.service';
import { LoginDto } from '@app/auth/dto/login.dto';
import { RegisterDto } from '@app/auth/dto/register.dto';
import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';
import { AuthenticatedRequest } from '@app/types/authenticated.request.type';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, username, isAdmin } =
      await this.authService.register(dto);

    const isProd = process.env.IS_PROD === 'true';

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProd,
      domain: isProd ? '.nqbral-games.fr' : '.nqbral-games.local',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken, username, isAdmin };
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, username, isAdmin } =
      await this.authService.login(dto);

    const isProd = process.env.IS_PROD === 'true';

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProd,
      domain: isProd ? '.nqbral-games.fr' : '.nqbral-games.local',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken, username, isAdmin };
  }

  @Post('refresh')
  async refresh(
    @Req() req: AuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token manquant');
    }

    return this.authService.refreshToken(refreshToken);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    const isProd = process.env.IS_PROD === 'true';

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: isProd,
      domain: isProd ? '.nqbral-games.fr' : '.nqbral-games.local',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { message: 'Déconnecté' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify_token')
  async verifyToken(@Req() req: AuthenticatedRequest) {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token manquant');
    }

    this.authService.verifyToken(refreshToken);
    return {
      message: 'Token vérifié',
    };
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    await this.authService.forgotPassword(email);

    return { message: 'Email de réinitialisation envoyé' };
  }

  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('password') password: string,
  ) {
    this.authService.resetPassword(token, password);

    return { message: 'Mot de passe réinitialisé.' };
  }
}
