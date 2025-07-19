import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/register')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() body: { user_name: string; password: string }) {
    try {
      return await this.userService.registerUser(body.user_name, body.password);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
