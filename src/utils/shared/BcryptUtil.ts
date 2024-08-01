import { hash, compare } from 'bcrypt';

export class BcryptUtil {
  static async encodeString(password: string): Promise<string> {
    const saltRounds = 10;
    return await hash(password, saltRounds);
  }

  static async compareString(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}
