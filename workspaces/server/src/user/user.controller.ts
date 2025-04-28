import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';
import { AuthenticatedRequest } from '@app/types/authenticated.request.type';
import { UserService } from '@app/user/user.service';
import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';

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
  @Put('update')
  async updateProfile(@Req() req: AuthenticatedRequest, @Body() updateData) {
    return this.userService.updateProfile(req.user.userId, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  async getStats(@Req() req: AuthenticatedRequest) {
    return this.userService.getStats(req.user.userId);
  }
}
