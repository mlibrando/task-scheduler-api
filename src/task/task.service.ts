import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  async addTask(userId: number, createTaskDto: AddTaskDto) {
    const { title, description, due_date } = createTaskDto;
    const createdTask = await this.prisma.tasks.create({
      data: {
        user_id: userId,
        title,
        description,
        due_date,
        created_at: new Date().toISOString(),
      },
    });

    if (createdTask) {
      return { success: true, message: 'Task created successfully' };
    } else {
      throw new Error('Failed to create task');
    }
  }

  async getTasks(userId: number) {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
    );
    const tasks = await this.prisma.tasks.findMany({
      where: { user_id: userId },
    });

    const dueTasks = tasks.filter((task) => {
      if (task.due_date) {
        const dueDate = new Date(task.due_date);
        return dueDate >= startOfDay && dueDate < endOfDay;
      }
    });

    return {
      all_tasks: tasks,
      due_tasks: dueTasks,
    };
  }
}
