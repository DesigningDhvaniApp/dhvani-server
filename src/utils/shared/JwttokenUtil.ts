import jwt from 'jsonwebtoken';

const SECRET_KEY = 'dhvani';
export class JwtToken {
  async generateToken(userName: string): Promise<string> {
    const payload = { userName: userName };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
  }

  async verifyToken(token: string) {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}
