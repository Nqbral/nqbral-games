import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';
import { UserService } from '@app/user/user.service';
import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    return this.userService.getProfile(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateProfile(@Req() req, @Body() updateData) {
    return this.userService.updateProfile(req.user.userId, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  async getStats(@Req() req) {
    return this.userService.getStats(req.user.userId);
  }
}
