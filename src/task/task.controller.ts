import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { AddTaskDto } from './dto/create-task.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

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
}
