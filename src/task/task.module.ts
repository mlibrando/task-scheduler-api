import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GroqModule } from 'src/groq/groq.module';

@Module({
  imports: [PrismaModule, GroqModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
