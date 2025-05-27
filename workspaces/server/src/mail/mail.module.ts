import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { existsSync } from 'fs';
import { join } from 'path';

import { MailService } from './mail.service';

const templatePath = join(__dirname, '..', '..', 'src', 'mail', 'templates');
// join(__dirname, 'mail', 'templates') // à utiliser pour la prod

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get('SMTP_HOST'),
          port: config.get<number>('SMTP_PORT'),
          secure: config.get<boolean>('SMTP_SECURE'),
          auth: {
            user: config.get('SMTP_USER'),
            pass: config.get('SMTP_PASS'),
          },
        },
        defaults: {
          from: `"Nqbral Games" <${config.get('SMTP_USER')}>`,
        },
        template: {
          dir: templatePath,
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
