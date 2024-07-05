import { Member } from "../../../entities/Member"
import { HttpError, Response404, ResponseConflict } from "../../../utils/Response"
import { BcryptUtil } from "../../../utils/shared/BcryptUtil"
import { SignUpDao } from "./SignUp.dao"


export class SignUpService {
  private signUpDao: SignUpDao

  constructor() {
    this.signUpDao = new SignUpDao()
  }

  async createMember(member: Partial<Member>): Promise<Member> {
    if (await this.signUpDao.userExists(member)) {
      throw new HttpError(ResponseConflict.message, ResponseConflict.code)
    }

    if (!member.password) {
      throw new HttpError("Please provide password", 400)
    }
    return await this.signUpDao.saveMemberInDB(member)
  }

  async updateMember(member: Member){
    const { id } = member
    if (!id) {
      throw new HttpError("Please provide member Id", 400)
    }

    const existingMember = await this.signUpDao.findMemberById(id)
    if (!existingMember) {
      throw new HttpError(Response404.message, Response404.code)
    }

    await this.signUpDao.updateMember(member)
  }

  async findMember(id: number): Promise<Member> {
    const existingMember = await this.signUpDao.findMemberById(id)
    if (!existingMember) {
      throw new HttpError(Response404.message, Response404.code)
    }

    return existingMember
  }

  async deleteMember(id: number) {
    const existingMember = await this.signUpDao.findMemberById(id)
    if (!existingMember) {
      throw new HttpError(Response404.message, Response404.code)
    }

    await this.signUpDao.deleteMember(id)
  }
}