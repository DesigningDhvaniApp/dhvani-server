import AppDataSource from '../db/data-source';
import { Address } from '../entities/Address';

export class AddressDao {
  private addressRepository = AppDataSource.getRepository(Address);

  async findById(id: number): Promise<Address | null> {
    if (!id) return null;
    return await this.addressRepository.findOneBy({ id: id });
  }

  async create(member: Partial<Address>): Promise<Address> {
    const entity = Object.assign(new Address(), member);
    return await this.addressRepository.create(entity);
  }

  async save(member: Partial<Address>): Promise<Address> {
    const entity = Object.assign(new Address(), member);
    return await this.addressRepository.save(entity);
  }

  async update(member: Address) {
    const entity = Object.assign(new Address(), member);
    return await this.addressRepository.update(entity.id, entity);
  }

  async deleteMember(id: number) {
    return await this.addressRepository.delete(id);
  }
}
