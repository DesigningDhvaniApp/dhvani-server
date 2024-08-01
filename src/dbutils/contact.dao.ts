import AppDataSource from '../db/data-source';
import { Contact } from '../entities/Contact';

export class ContactDao {
  private contactRepository = AppDataSource.getRepository(Contact);

  async findById(id: number): Promise<Contact | null> {
    if (!id) return null;
    return await this.contactRepository.findOneBy({ id: id });
  }

  async findByEmail(email: string): Promise<Contact | null> {
    if (!email) return null;
    return await this.contactRepository.findOneBy({ email: email });
  }

  async create(member: Partial<Contact>): Promise<Contact> {
    const entity = Object.assign(new Contact(), member);
    return await this.contactRepository.create(entity);
  }

  async save(member: Partial<Contact>): Promise<Contact> {
    const entity = Object.assign(new Contact(), member);
    return await this.contactRepository.save(entity);
  }

  async update(member: Contact) {
    const entity = Object.assign(new Contact(), member);
    return await this.contactRepository.update(entity.id, entity);
  }

  async deleteMember(id: number) {
    return await this.contactRepository.delete(id);
  }
}
