import prisma from '@/lib/prisma';
import { hashPassword, comparePassword } from '@/lib/auth';

export class AuthService {
  static async register(data: {
    name: string;
    email: string;
    passwordHash: string;
    phone: string;
    state: string;
    lga: string;
    community: string;
  }) {
    // Hash password
    const hashedPassword = await hashPassword(data.passwordHash);

    // Create user in DB
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        password: hashedPassword,
        phone: data.phone,
        state: data.state,
        lga: data.lga,
        community: data.community,
      },
    });
  }

  static async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });
  }

  static async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        state: true,
        lga: true,
        community: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
