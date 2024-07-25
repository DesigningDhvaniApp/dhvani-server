import { Member } from '../../entities/Member';

export interface MemberWithToken {
  member: Member;
  token: string;
}
