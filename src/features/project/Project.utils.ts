import { Member } from '../../entities/Member';
import { MailService } from '../mail-service/MailService';

export class ProjectUtils {
  private mailService = new MailService();

  async sendMailToUsers(user: Member) {
    this.mailService.send({
      to: user.email,
      subject: 'Adding new project',
      templateName: 'add-project',
      replacements: {},
    });
  }
}
