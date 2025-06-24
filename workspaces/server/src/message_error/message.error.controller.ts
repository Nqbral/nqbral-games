import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';
import { AuthenticatedRequest } from '@app/types/authenticated.request.type';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { EditMessageErrorDto } from './dto/edit.message.error.dto';
import { MessageErrorService } from './message.error.service';

@Controller('message_error')
export class MessageErrorController {
  constructor(private readonly messageErrorService: MessageErrorService) {}

  @Get('message')
  async getMessage() {
    return this.messageErrorService.getMessageError();
  }

  @UseGuards(JwtAuthGuard)
  @Post('edit_message_error')
  async editMessageError(
    @Req() req: AuthenticatedRequest,
    @Body() updateData: EditMessageErrorDto,
  ) {
    return this.messageErrorService.updateMessageError(req, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async delete(@Req() req: AuthenticatedRequest) {
    return this.messageErrorService.deleteMessageError(req);
  }
}
