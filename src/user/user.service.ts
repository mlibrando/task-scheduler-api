import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { comparePassword, hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async registerUser(username: string, password: string) {
    const hashedPassword = await hashPassword(password);
    return this.prisma.users.create({
      data: { username, password: hashedPassword },
    });
  }

  async loginUser(username: string, enteredPassword: string) {
    const user = await this.findUser(username);

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await comparePassword(
      enteredPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findUser(username: string) {
    try {
      const user = await this.prisma.users.findUnique({
        where: { username: username },
      });

      if (!user) {
        throw Error('user not found');
      }

      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
