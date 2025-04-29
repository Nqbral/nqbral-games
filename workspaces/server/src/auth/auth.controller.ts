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
    const { accessToken, refreshToken, username } =
      await this.authService.register(dto);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken, username };
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, username } =
      await this.authService.login(dto);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken, username };
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

    return this.authService.refreshTokens(refreshToken);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken', { path: '/auth/refresh' });
    return { message: 'Déconnecté' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify-token')
  async verifyToken(@Req() req: AuthenticatedRequest) {
    const user = req.user;
    return {
      userId: user.userId,
      username: user.username,
    };
  }
}
