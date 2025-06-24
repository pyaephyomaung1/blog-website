import prisma from '../prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService {
  async login(username: string, password: string): Promise<string> {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const jwtSecret: string = process.env.JWT_SECRET || 'fallback_secret';
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1h';

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(payload, jwtSecret);

    return token;
  }
}