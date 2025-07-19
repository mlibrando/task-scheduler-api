import { IsString, IsNotEmpty } from 'class-validator';

export class AddTaskDto {
  @IsString()
  @IsNotEmpty()
  prompt: string;
}
