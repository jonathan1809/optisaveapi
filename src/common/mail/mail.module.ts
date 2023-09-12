import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import { EnumEnvironmentKeys } from '../../config/env.config';

const buildMailOptions = async (config: ConfigService) => {
  const mailOptions = {
    transport: {
      host: config.get(EnumEnvironmentKeys.mailHost),
      port: config.get(EnumEnvironmentKeys.mailPort),
      ignoreTLS: config.get(EnumEnvironmentKeys.mailIgnoreTls),
      secure: config.get(EnumEnvironmentKeys.mailSecure),
      auth: {
        user: config.get(EnumEnvironmentKeys.mailUser),
        pass: config.get(EnumEnvironmentKeys.mailPassword),
      },
    },
    preview: config.getOrThrow(EnumEnvironmentKeys.mailPreview),
    defaults: {
      from: `"No Reply" <${config.get(EnumEnvironmentKeys.mailFrom)}>`,
    },
    template: {
      dir: join(__dirname, 'templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
    options: {
      partials: {
        dir: join(__dirname, 'templates', 'partials'),
        options: {
          strict: true,
        },
      },
    }
  }
  if (config.getOrThrow(EnumEnvironmentKeys.environment) !== 'dev') {
    delete mailOptions.preview
  }
  return mailOptions
}
@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: buildMailOptions,
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule { }