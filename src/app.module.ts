import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { GroqModule } from './groq/groq.module';
@Module({
  imports: [PrismaModule, UserModule, AuthModule, TaskModule, GroqModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
