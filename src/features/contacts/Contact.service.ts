import { Member } from "../../entities/Member";
import { Contact } from "../../entities/Contact";
import { MailService } from "../mail-service/MailService";
import { ContactDao } from "./Contact.dao";
import AppDataSource from "../../db/data-source";


export class ContactService {
    private contactDao: ContactDao;
    private mailService: MailService;
  private memberRepository = AppDataSource.getRepository(Member);


    constructor() {
        this.contactDao = new ContactDao();
        this.mailService = new MailService();
    }

    async createContact(contact: Contact): Promise<Contact> {
        await this.contactDao.saveContactInDB(contact);
        this.mailService.send({
            to: contact.email,
            subject: 'Contact Us Mail',
            templateName: 'contact-person',
            replacements: {
              name: contact.name
            },
          });

        const member = await this.memberRepository.findOneBy({ isAdmin: true });
        this.mailService.send({
            to: member.email,
            subject: 'Admin Notifying Mail',
            templateName: 'admin_mail',
            replacements: {
              name: contact.name,
              email: contact.email,
              message: contact.message,
              adminName: member.userName,
              phone: contact.phone
            },
          });
        
        return contact;
    }
}