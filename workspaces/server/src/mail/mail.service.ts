import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcome(to: string, username: string) {
    const isProd = process.env.IS_PROD === 'true';

    if (!isProd) {
      return;
    }

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

  async sendPasswordReset(to: string, username: string, token: string) {
    const isProd = process.env.IS_PROD === 'true';

    if (!isProd) {
      return;
    }

    const resetUrl = `${process.env.CORS_ALLOW_ORIGIN_NQBRAL_GAMES ?? ''}/reset-password?token=${token}`;
    await this.mailerService.sendMail({
      to,
      subject: 'Réinitialisation du mot de passe',
      template: './reset-password',
      context: {
        username: username,
        resetLink: resetUrl,
        year: new Date().getFullYear(),
      },
    });
  }

  async sendDeletionMail(to: string, username: string) {
    const isProd = process.env.IS_PROD === 'true';

    if (!isProd) {
      return;
    }

    await this.mailerService.sendMail({
      to,
      subject: 'Suppression du compte',
      template: './delete-account',
      context: {
        username: username,
        year: new Date().getFullYear(),
      },
    });
  }

  async sendContactMail(name: string, email: string, message: string) {
    await this.mailerService.sendMail({
      to: 'contact@nqbral-games.fr',
      subject: 'Message de support',
      template: './support-message',
      context: {
        name: name,
        email: email,
        message: message,
        year: new Date().getFullYear(),
      },
    });
  }
}
