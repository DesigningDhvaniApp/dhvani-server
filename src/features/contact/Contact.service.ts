import { Contact } from '../../entities/Contact';
import { MemberDao } from '../../dbutils/member.dao';
import { ContactDao } from '../../dbutils/contact.dao';
import { ContactUtil } from './Contact.util';

export class ContactService {
  private contactDao = new ContactDao();
  private contactUtil = new ContactUtil();
  private memberDao = new MemberDao();

  async createContact(contact: Contact): Promise<Contact> {
    await this.contactDao.save(contact);

    // Send mail to user
    this.contactUtil.sendMailtoMember(contact.email, contact.name);

    const admin = await this.memberDao.findOne({ where: { isAdmin: true } });
    if (admin) {
      // Send mail to admin
      this.contactUtil.sendMailToAdmin(
        admin.email,
        `${admin.lastName} ${admin.firstName}`,
        contact,
      );
    }

    return contact;
  }
}
