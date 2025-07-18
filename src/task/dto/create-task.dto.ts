import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class AddTaskDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  due_date?: string;
}
