import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/api/login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) throw new UnauthorizedException('Invalid credentials');

    return this.authService.login(user);
  }
}
