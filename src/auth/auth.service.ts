import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { comparePassword } from 'src/utils/bcrypt';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private taskService: TaskService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findUser(username);
    if (user && (await comparePassword(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: { username: string; user_id: number }) {
    const payload = { username: user.username, sub: user.user_id };
    const dueTasks = await this.taskService.getTasksDueToday(user.user_id);
    return {
      access_token: this.jwtService.sign(payload),
      due_tasks: dueTasks,
    };
  }
}
