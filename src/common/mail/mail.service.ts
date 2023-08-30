import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailParams } from './types/mail-adapter.type';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) { }

  async sendMail(mailInfo: MailParams) {
    console.log("sending email")
    return this.mailerService.sendMail(mailInfo);
  }
}