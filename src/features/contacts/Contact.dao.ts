import AppDataSource from '../../db/data-source';
import { Contact } from '../../entities/Contact';

export class ContactDao {
  private contactRepository = AppDataSource.getRepository(Contact);

  async saveContactInDB(contact: Contact): Promise<Contact> {
    const entity = Object.assign(new Contact(), contact);
    return await this.contactRepository.save(entity);
  }
}
