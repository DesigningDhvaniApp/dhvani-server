import NodeMailer from 'nodemailer';
import dotenv from 'dotenv';
import { MailData } from './Types';
dotenv.config();

export class MailService {
  createTransporter() {
    return NodeMailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASSWORD,
      },
    });
  }

  async send(mailData: MailData) {
    const transporter = this.createTransporter();

    try {
      await transporter.sendMail({
        from: `<${process.env.MAIL_AUTH_USER}>`,
        to: mailData.to,
        subject: mailData.subject,
        text: mailData.text,
      });
    } catch (error) {
      throw new Error('Unable to send mail');
    }
  }
}
