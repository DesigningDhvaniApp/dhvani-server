import { Member } from "../../entities/Member";
import AppDataSource from "../../db/data-source";


export class AuthenticationDao {
    private memberRepository = AppDataSource.getRepository(Member);

  async userExists(member: Partial<Member>): Promise<boolean> {
    if (await this.findMemberByUsername(member.userName)) return true;
    if (await this.findMemberById(member.id)) return true;
    if (await this.findMemberByEmail(member.email)) return true;
    return false;
  }
  
  async findMemberByUsername(userName: string): Promise<Member | null> {
    if (!userName) return null;
    return await this.memberRepository.findOneBy({ userName: userName });
  }

  async findMemberById(id: number): Promise<Member | null> {
    if (!id) return null;
    return await this.memberRepository.findOneBy({ id: id });
  }

  async findMemberByEmail(email: string): Promise<Member | null> {
    if (!email) return null;
    return await this.memberRepository.findOneBy({ email: email });
  }

  async saveMemberInDB(member: Member): Promise<Member> {
    const entity = Object.assign(new Member(), member);
    return await this.memberRepository.save(entity);
  }

  async updateMember(member: Member) {
    const entity = Object.assign(new Member(), member);
    return await this.memberRepository.update(entity.id, entity);
  }

  async deleteMember(id: number) {
    return await this.memberRepository.delete(id);
  }

  async prepareMemberWithInfo(id: number): Promise<Member> {
    return await this.memberRepository
    .createQueryBuilder('member')
    .leftJoinAndSelect('member.address', 'address')
    .select([
      'member.id',
      'member.firstName',
      'member.lastName',
      'member.phone',
      'member.userName',
      'member.email',
      'address',
    ])
    .where('member.id = :id', { id: id })
    .getOne();
  }
}