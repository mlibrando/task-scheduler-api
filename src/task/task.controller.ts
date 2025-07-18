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

@Controller('api/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTasks(@CurrentUser() user: { userId: number }) {
    try {
      return await this.taskService.getTasks(user.userId);
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
      return await this.taskService.addTask(user.userId, addTaskDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
