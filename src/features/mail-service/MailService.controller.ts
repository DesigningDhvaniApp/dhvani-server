import { MailService } from './MailService';
import { MailData } from './Types';

export class MailServiceController {
  private mailService: MailService;

  constructor() {
    this.mailService = new MailService();
  }

  public async sendMail() {
    const mailData: MailData = {
      to: 'anjireddy12382@gmail.com',
      subject: 'Welcome to Our Service',
      templateName: 'mail', // The name of your HTML template file without the .html extension
      replacements: {
        name: 'Anji Reddy', // Replace {{username}} in your template
      },
    };

    await this.mailService.send(mailData);
  }
}
