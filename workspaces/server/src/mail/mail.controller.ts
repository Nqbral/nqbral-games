import { AuthenticatedRequest } from '@app/types/authenticated.request.type';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';

import { ContactMessageDto } from './dto/contact.message.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('contact')
  async sendContactMail(@Body() messageData: ContactMessageDto): Promise<void> {
    await this.mailService.sendContactMail(
      messageData.name,
      messageData.email,
      messageData.message,
    );
  }
}
