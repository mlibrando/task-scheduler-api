import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GroqService } from '../groq/groq.service';
import { EditTaskDto } from './dto/edit-task.dto';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private readonly groqService: GroqService,
  ) {}
  async getAllTasks(userId: number, take = 10, cursor?: number) {
    const tasks = await this.prisma.tasks.findMany({
      where: { user_id: userId },
      orderBy: { task_id: 'asc' },
      take,
      ...(cursor && {
        skip: 1,
        cursor: { task_id: cursor },
      }),
    });

    const nextCursor =
      tasks.length === take ? tasks[tasks.length - 1].task_id : null;

    return {
      data: tasks,
      nextCursor,
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

  async editTask(taskId: number, editTaskDto: EditTaskDto) {
    const { title, description, due_date } = editTaskDto;

    const foundTask = await this.prisma.tasks.findUnique({
      where: { task_id: taskId },
    });

    if (!foundTask) {
      throw new Error('Task does not exist');
    }

    const editTask = await this.prisma.tasks.update({
      where: { task_id: taskId },
      data: {
        title,
        description,
        due_date,
      },
    });

    return {
      success: true,
      message: 'Updated task successfully',
      data: editTask,
    };
  }

  async deleteTask(taskId: number) {
    const foundTask = await this.prisma.tasks.findUnique({
      where: { task_id: taskId },
    });

    if (!foundTask) {
      throw new Error('Task does not exist');
    }

    await this.prisma.tasks.delete({
      where: {
        task_id: taskId,
      },
    });

    return { success: true, message: 'Task successfully deleted' };
  }

  async markAsCompleted(taskId: number) {
    const task = await this.prisma.tasks.findUnique({
      where: { task_id: taskId },
    });

    if (!task) {
      throw new Error('Task not found');
    }

    if (task.is_completed) {
      return { success: false, message: 'Task is already completed' };
    }

    const updated = await this.prisma.tasks.update({
      where: { task_id: taskId },
      data: {
        is_completed: true,
        completed_at: new Date().toISOString(),
      },
    });

    return {
      success: true,
      message: 'Task marked as completed',
      task: updated,
    };
  }

  async markAsUncompleted(taskId: number) {
    const task = await this.prisma.tasks.findFirst({
      where: { task_id: taskId },
    });

    if (!task || !task.is_completed) {
      throw new Error('Task not found or not completed');
    }

    const updated = await this.prisma.tasks.update({
      where: { task_id: taskId },
      data: {
        is_completed: false,
        completed_at: null,
      },
    });

    return {
      success: true,
      message: 'Task marked as uncompleted',
      task: updated,
    };
  }
}
