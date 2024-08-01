import { Contact } from '../../entities/Contact';
import { MailService } from '../mail-service/MailService';

export class ContactUtil {
  private mailService = new MailService();

  async sendMailtoMember(email: string, name: string) {
    console.log(email);
    await this.mailService.send({
      to: email,
      subject: 'Contact Us Mail',
      templateName: 'contact-person',
      replacements: {
        name: name,
      },
    });
  }

  async sendMailToAdmin(adminEmail: string, adminName: string, contact: Contact) {
    await this.mailService.send({
      to: adminEmail,
      subject: 'Admin Notifying Mail',
      templateName: 'admin_mail',
      replacements: {
        name: contact.name,
        email: contact.email,
        message: contact.message,
        adminName: adminName,
        phone: contact.phone,
      },
    });
  }
}
