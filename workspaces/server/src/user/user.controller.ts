import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';
import {
  StatsLastHope,
  StatsShadowNetwork,
} from '@app/auth/schemas/user.schema';
import { AuthenticatedRequest } from '@app/types/authenticated.request.type';
import { UserService } from '@app/user/user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { EditPasswordDto } from './dto/edit.password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    return this.userService.getProfile(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('edit_password')
  async editPassword(
    @Req() req: AuthenticatedRequest,
    @Body() updateData: EditPasswordDto,
  ) {
    return this.userService.updatePassword(req.user.userId, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  async getStats(@Req() req: AuthenticatedRequest) {
    return this.userService.getStats(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('stats/last-hope')
  async updateLastHopeStats(
    @Req() req: AuthenticatedRequest,
    @Body() statsUpdate: Partial<StatsLastHope>,
  ) {
    return this.userService.updateLastHopeStats(req.user.userId, statsUpdate);
  }

  @UseGuards(JwtAuthGuard)
  @Put('stats/shadow-network')
  async updateShadowNetworkStats(
    @Req() req: AuthenticatedRequest,
    @Body() statsUpdate: Partial<StatsShadowNetwork>,
  ) {
    return this.userService.updateShadowNetworkStats(
      req.user.userId,
      statsUpdate,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete_account')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAccount(@Req() req: AuthenticatedRequest): Promise<void> {
    await this.userService.deleteAccount(req.user.userId);
  }
}
