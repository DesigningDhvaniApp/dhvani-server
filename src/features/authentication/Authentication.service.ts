import { JwtToken } from '../../utils/shared/JwttokenUtil';
import { Member } from '../../entities/Member';
import { HttpError, Response404, ResponseConflict } from '../../utils/Response';
import { AuthenticationDao } from './Authentication.dao';
import { MemberWithToken } from '../../features/authentication/Types';
import { MemberDao } from '../../dbutils/member.dao';
import { AuthenticationUtil } from './Authentication.util';
import { BcryptUtil } from '../../utils/shared/BcryptUtil';
import config from '../../config';

export class AuthenticationService {
  private authenticationDao = new AuthenticationDao();
  private jwtToken = new JwtToken();
  private memberDao = new MemberDao();
  private authenticationUtil = new AuthenticationUtil();

  async createMember(member: Member): Promise<MemberWithToken> {
    const existingMember = await this.authenticationDao.userExists(member);
    if (existingMember) {
      throw new HttpError(ResponseConflict.message, ResponseConflict.code);
    }

    const db_member = await this.memberDao.save(member);

    const token = await this.jwtToken.generateToken(db_member.email);
    const user = await this.authenticationDao.prepareMemberWithInfo(db_member.id);

    // Send Welcome mail to member
    this.authenticationUtil.sendMemberCreationMail(db_member);

    return {
      member: user,
      token: token,
    };
  }

  async updateMember(member: Member) {
    const { id } = member;
    if (!id) {
      throw new HttpError('Please provide member Id', 400);
    }

    const existingMember = await this.memberDao.findById(id);
    if (!existingMember) {
      throw new HttpError(Response404.message, Response404.code);
    }

    await this.memberDao.update(member);
  }

  async findMember(id: number): Promise<Member> {
    const existingMember = await this.memberDao.findById(id);
    if (!existingMember) {
      throw new HttpError(Response404.message, Response404.code);
    }

    return await this.authenticationDao.prepareMemberWithInfo(existingMember.id);
  }

  async deleteMember(id: number) {
    const existingMember = await this.memberDao.findById(id);
    if (!existingMember) {
      throw new HttpError(Response404.message, Response404.code);
    }

    await this.memberDao.deleteMember(id);
  }

  async signIn(userNameOrEmail: string, password: string): Promise<MemberWithToken> {
    const member = await this.memberDao.findOne({
      where: [{ email: userNameOrEmail }, { userName: userNameOrEmail }],
    });
    if (!member) {
      throw new HttpError('Member does not exist', 404);
    }

    const isPasswordValid = await BcryptUtil.compareString(password, member.password);
    if (!isPasswordValid) {
      throw new HttpError('Password is incorrect', 400);
    }
    return {
      member: await this.authenticationDao.prepareMemberWithInfo(member.id),
      token: await this.jwtToken.generateToken(member.email),
    };
  }

  async forgotPassword(email: string) {
    const member = await this.memberDao.findByEmail(email);
    if (!member) {
      throw new HttpError('Member does not exist', 404);
    }
    const token = await this.jwtToken.generateToken(member.email);

    member.forgotPasswordToken = token;
    await this.memberDao.save(member);

    const url = `${config.DEFAULT.DHVANI_UI}/auth/member/forgot-password/verify?token=${token}`;

    // Send mail
    this.authenticationUtil.sendForgotPasswordMail(member, url);

    return 'Forgot password mail sent.';
  }

  async verifyForgotPassword(token: string, password: string) {
    if (!password) {
      throw new Error('Please provide new password');
    }

    const decode = await this.jwtToken.verifyToken(token);
    if (!decode) {
      throw new Error('Invalid or expired token');
    }

    const email = decode.userName;
    if (!email) {
      throw new HttpError('Member does not exist', 404);
    }

    const member = await this.memberDao.findByEmail(email);

    if (member.forgotPasswordToken !== token) {
      throw new HttpError('This link is not valid', 400);
    } else {
      member.forgotPasswordToken = null;
      member.password = password;
      await this.memberDao.save(member);
    }
  }
}
