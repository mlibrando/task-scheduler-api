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
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/due')
  async getTasksDueToday(@CurrentUser() user: { userId: number }) {
    try {
      return await this.taskService.getTasksDueToday(user.userId);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  async addTask(
    @CurrentUser() user: { userId: number },
    @Body() addTaskDto: AddTaskDto,
  ) {
    try {
      return this.taskService.addTaskFromPrompt(user.userId, addTaskDto.prompt);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/edit/:id')
  async editTask(
    @Param('id') taskId: string,
    @Body() editTaskDto: EditTaskDto,
  ) {
    try {
      return this.taskService.editTask(Number(taskId), editTaskDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async deleteTask(@Param('id') taskId: string) {
    try {
      return this.taskService.deleteTask(Number(taskId));
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
