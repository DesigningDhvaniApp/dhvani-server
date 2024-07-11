import { MailService } from '../../../features/mail-service/MailService';
import { Member } from '../../../entities/Member';
import { HttpError, Response404, ResponseConflict } from '../../../utils/Response';
import { SignUpDao } from './SignUp.dao';

export class SignUpService {
  private signUpDao: SignUpDao;
  private mailService: MailService;

  constructor() {
    this.signUpDao = new SignUpDao();
    this.mailService = new MailService();
  }

  async createMember(member: Member): Promise<Member> {
    if (await this.signUpDao.userExists(member)) {
      throw new HttpError(ResponseConflict.message, ResponseConflict.code);
    }

    if (!member.password) {
      throw new HttpError('Please provide password', 400);
    }
    await this.signUpDao.saveMemberInDB(member);

    await this.mailService.send({
      to: member.email,
      subject: 'Registration Successful',
      templateName: 'welcome',
      replacements: {
        firstName: member.firstName,
        lastName: member.lastName
      }
    })
    return member;
  }

  async updateMember(member: Member) {
    const { id } = member;
    if (!id) {
      throw new HttpError('Please provide member Id', 400);
    }

    const existingMember = await this.signUpDao.findMemberById(id);
    if (!existingMember) {
      throw new HttpError(Response404.message, Response404.code);
    }

    await this.signUpDao.updateMember(member);
  }

  async findMember(id: number): Promise<Member> {
    const existingMember = await this.signUpDao.findMemberById(id);
    if (!existingMember) {
      throw new HttpError(Response404.message, Response404.code);
    }

    return existingMember;
  }

  async deleteMember(id: number) {
    const existingMember = await this.signUpDao.findMemberById(id);
    if (!existingMember) {
      throw new HttpError(Response404.message, Response404.code);
    }

    await this.signUpDao.deleteMember(id);
  }
}
