import bcrypt from 'bcrypt'

export class BcryptUtil {

    static async encodeString(password: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds)
    }
}