import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcome(to: string, username: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Bienvenue sur Nqbral Games !',
      template: './welcome',
      context: {
        username: username,
        year: new Date().getFullYear(),
      },
    });
  }

  async sendPasswordReset(to: string, token: string) {
    const resetUrl = `https://nqbral-games.fr/reset-password?token=${token}`;
    await this.mailerService.sendMail({
      to,
      subject: 'Réinitialisation du mot de passe',
      template: './reset-password',
      context: { resetUrl },
    });
  }
}
