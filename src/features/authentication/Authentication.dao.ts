import { Member } from '../../entities/Member';
import AppDataSource from '../../db/data-source';
import { MemberDao } from '../../dbutils/member.dao';

// DAO = DATA ACCESS OBJECT

export class AuthenticationDao {
  private memberRepository = AppDataSource.getRepository(Member);
  private memberDao = new MemberDao();

  async userExists(member: Partial<Member>): Promise<boolean> {
    if (await this.memberDao.findByUsername(member.userName)) return true;
    if (await this.memberDao.findById(member.id)) return true;
    if (await this.memberDao.findByEmail(member.email)) return true;
    return false;
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
