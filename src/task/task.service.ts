import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GroqService } from '../groq/groq.service';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private readonly groqService: GroqService,
  ) {}
  async addTaskFromPrompt(userId: number, prompt: string) {
    const parsed = await this.groqService.parseTaskPrompt(prompt);

    const { title, description, due_date } = parsed;

    const createdTask = await this.prisma.tasks.create({
      data: {
        user_id: userId,
        title,
        description,
        due_date,
        created_at: new Date().toISOString(),
      },
    });

    return {
      success: true,
      message: 'Task created from prompt',
      task: createdTask,
    };
  }

  async getTasksDueToday(userId: number) {
    const now = new Date();
    const startOfDay = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
    );
    const endOfDay = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1),
    );

    const tasksDueToday = await this.prisma.tasks.findMany({
      where: {
        user_id: userId,
        due_date: {
          gte: startOfDay.toISOString(),
          lt: endOfDay.toISOString(),
        },
      },
    });

    return tasksDueToday;
  }
}
