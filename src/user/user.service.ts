import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async registerUser(username: string, password: string) {
    const hashedPassword = await hashPassword(password);
    return this.prisma.users.create({
      data: { username, password: hashedPassword },
    });
  }

  async findUser(username: string) {
    const user = await this.prisma.users.findUnique({
      where: { username },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
