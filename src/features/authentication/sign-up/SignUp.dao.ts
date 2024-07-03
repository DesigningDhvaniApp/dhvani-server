import { promises } from "dns";
import AppDataSource from "../../../db/data-source";
import { Member } from "../../../entities/Member";

export class SignUpDao {
  private memberRepository = AppDataSource.getRepository(Member)

  async userExists(member: Partial<Member>): Promise<boolean> {
    if (await this.findMemberByUsername(member.userName)) return true
    if (await this.findMemberById(member.id)) return true
    if (await this.findMemberByEmail(member.email)) return true
    return false
  }

  async findMemberByUsername(userName: string): Promise<Member | null> {
    return await this.memberRepository.findOneBy({ userName: userName })
  }

  async findMemberById(id: number): Promise<Member | null> {
    return await this.memberRepository.findOneBy({ id: id })
  }

  async findMemberByEmail(email: string): Promise<Member | null> {
    return await this.memberRepository.findOneBy({ email: email })
  }

  async saveMemberInDB(member: Partial<Member>): Promise<Member> {
    return await this.memberRepository.save(member)
  }

  async updateMember(member: Member) {
    return await this.memberRepository.update(member.id, member)
  }

  async deleteMember(id: number) {
    return await this.memberRepository.delete(id)
  }
}