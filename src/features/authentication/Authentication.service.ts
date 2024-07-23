import { JwtToken } from "../../utils/shared/JwttokenUtil";
import AppDataSource from "../../db/data-source";
import { Member } from "../../entities/Member";
import { HttpError, Response404, ResponseConflict } from "../../utils/Response";
import { MailService } from "../mail-service/MailService";
import { AuthenticationDao } from "./Authentication.dao";
import { compare } from 'bcrypt';
import { MemberWithToken } from '../../features/authentication/Types'


export class AuthenticationService {
    private authenticationDao: AuthenticationDao;
    private mailService: MailService;
    private jwtToken: JwtToken;
    private memberRepository = AppDataSource.getRepository(Member);

  constructor() {
    this.authenticationDao = new AuthenticationDao();
    this.mailService = new MailService();
    this.jwtToken = new JwtToken();
  }

  async createMember(member: Member): Promise<MemberWithToken> {
    const existingMember = await this.authenticationDao.userExists(member)
    if (existingMember) {
      throw new HttpError(ResponseConflict.message, ResponseConflict.code);
    }

    if (!member.password) {
      throw new HttpError('Please provide password', 400);
    }
    let db_member = await this.authenticationDao.saveMemberInDB(member);
     this.mailService.send({
      to: member.email,
      subject: 'Registration Successful',
      templateName: 'welcome',
      replacements: {
        firstName: member.firstName,
        lastName: member.lastName,
      },
    });
    const token = await this.jwtToken.generateToken(db_member.userName);
    const user = await this.authenticationDao.prepareMemberWithInfo(db_member.id)
    return {
      member: user, 
      token: token
    };
  }

  async updateMember(member: Member) {
    const { id } = member;
    if (!id) {
      throw new HttpError('Please provide member Id', 400);
    }

    const existingMember = await this.authenticationDao.findMemberById(id);
    if (!existingMember) {
      throw new HttpError(Response404.message, Response404.code);
    }

    await this.authenticationDao.updateMember(member);
  }

  async findMember(id: number): Promise<Member> {
    const existingMember = await this.authenticationDao.findMemberById(id);
    if (!existingMember) {
      throw new HttpError(Response404.message, Response404.code);
    }

    return await this.authenticationDao.prepareMemberWithInfo(existingMember.id);
  }

  async deleteMember(id: number) {
    const existingMember = await this.authenticationDao.findMemberById(id);
    if (!existingMember) {
      throw new HttpError(Response404.message, Response404.code);
    }

    await this.authenticationDao.deleteMember(id);
  }

  async signIn(userNameOrEmail: string, password: string): Promise<Member>{
    const member = await this.memberRepository.findOne({ where: [{ email: userNameOrEmail }, { userName: userNameOrEmail }] });
    if (!member) {
      throw new HttpError('Member does not exist', 404);
    }

    const isPasswordValid = await compare(password, member.password);
    if (!isPasswordValid) {
      throw new HttpError('Password is incorrect', 400);
    }
    return await this.authenticationDao.prepareMemberWithInfo(member.id);
}

async forgotPassword(email: string) {
    const member = await this.memberRepository.findOneBy({ email: email});
    if (!member) {
        throw new HttpError('Member does not exist', 404);
    }

    await this.mailService.send({
        to: member.email,
        subject: 'Forgot Password',
        templateName: 'reset-password',
        replacements: {
          firstName: member.firstName,
          lastName: member.lastName,
        },
      });
      return await this.authenticationDao.prepareMemberWithInfo(member.id);

}
}