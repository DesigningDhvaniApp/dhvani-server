import { FindOneOptions } from 'typeorm';
import AppDataSource from '../db/data-source';
import { Member } from '../entities/Member';

export class MemberDao {
  private memberRepository = AppDataSource.getRepository(Member);

  async findByUsername(userName: string): Promise<Member | null> {
    if (!userName) return null;
    return await this.memberRepository.findOneBy({ userName: userName });
  }

  async findOne(options: FindOneOptions<Member>): Promise<Member | null> {
    return await this.memberRepository.findOne(options);
  }

  async findById(id: number): Promise<Member | null> {
    if (!id) return null;
    return await this.memberRepository.findOneBy({ id: id });
  }

  async findByEmail(email: string): Promise<Member | null> {
    if (!email) return null;
    return await this.memberRepository.findOneBy({ email: email });
  }

  async create(member: Partial<Member>): Promise<Member> {
    const entity = Object.assign(new Member(), member);
    return await this.memberRepository.create(entity);
  }

  async save(member: Partial<Member>): Promise<Member> {
    const entity = Object.assign(new Member(), member);
    return await this.memberRepository.save(entity);
  }

  async update(member: Member) {
    const entity = Object.assign(new Member(), member);
    return await this.memberRepository.update(entity.id, entity);
  }

  async deleteMember(id: number) {
    return await this.memberRepository.delete(id);
  }
}
