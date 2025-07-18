import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(@Body() body: { user_name: string; password: string }) {
    return this.userService.registerUser(body.user_name, body.password);
  }

  @Get('/hello')
  @UseGuards(JwtAuthGuard)
  hello(@CurrentUser() user: { userId: number; username: string }) {
    return user;
  }
}
