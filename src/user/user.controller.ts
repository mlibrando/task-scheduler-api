import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/register')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: { user_name: string; password: string }) {
    return this.userService.registerUser(body.user_name, body.password);
  }
}
