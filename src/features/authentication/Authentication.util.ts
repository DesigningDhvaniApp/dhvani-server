import { Member } from '../../entities/Member';
import { MailService } from '../mail-service/MailService';

export class AuthenticationUtil {
  private mailService = new MailService();

  async sendMemberCreationMail(member: Member) {
    await this.mailService.send({
      to: member.email,
      subject: 'Registration Successful',
      templateName: 'welcome',
      replacements: {
        firstName: member.firstName,
        lastName: member.lastName,
      },
    });
  }

  async sendForgotPasswordMail(member: Member, url: string) {
    this.mailService.send({
      to: member.email,
      subject: 'Forgot Password',
      templateName: 'reset-password',
      replacements: {
        firstName: member.firstName,
        lastName: member.lastName,
        url: url,
      },
    });
  }
}
