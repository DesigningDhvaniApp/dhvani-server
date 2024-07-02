import { Member } from "../../../entities/Member"
import { HttpError, ResponseConflict } from "../../../utils/Response"
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

    return await this.signUpDao.saveMemberInDB(member)
  }
}