import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { AddTaskDto } from './dto/add-task.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EditTaskDto } from './dto/edit-task.dto';

@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTasks(
    @CurrentUser() user: { userId: number },
    @Query('take') take = '10',
    @Query('cursor') cursor?: string,
  ) {
    try {
      return await this.taskService.getAllTasks(
        user.userId,
        Number(take),
        cursor ? Number(cursor) : undefined,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/due')
  async getTasksDueToday(@CurrentUser() user: { userId: number }) {
    try {
      return await this.taskService.getTasksDueToday(user.userId);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  async addTask(
    @CurrentUser() user: { userId: number },
    @Body() addTaskDto: AddTaskDto,
  ) {
    try {
      return await this.taskService.addTaskFromPrompt(
        user.userId,
        addTaskDto.prompt,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/edit/:id')
  async editTask(
    @Param('id') taskId: string,
    @Body() editTaskDto: EditTaskDto,
  ) {
    try {
      return await this.taskService.editTask(Number(taskId), editTaskDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async deleteTask(@Param('id') taskId: string) {
    try {
      return await this.taskService.deleteTask(Number(taskId));
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/mark-complete/:id')
  async markAsCompleted(@Param('id') taskId: string) {
    try {
      return await this.taskService.markAsCompleted(Number(taskId));
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/mark-uncomplete/:id')
  async markAsUncomplete(@Param('id') taskId: string) {
    try {
      return await this.taskService.markAsUncompleted(Number(taskId));
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
