import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { TaskModule } from 'src/task/task.module';
import { TaskService } from 'src/task/task.service';
import { GroqService } from 'src/groq/groq.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    TaskModule,
    JwtModule.register({
      secret: 'your_jwt_secret', // store in .env in real apps
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, UserService, TaskService, GroqService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
