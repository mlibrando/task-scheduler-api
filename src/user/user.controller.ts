import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(@Body() body: { user_name: string; password: string }) {
    return this.userService.registerUser(body.user_name, body.password);
  }

  @Post('/login')
  login(@Body() body: { user_name: string; password: string }) {
    return this.userService.loginUser(body.user_name, body.password);
  }
}
