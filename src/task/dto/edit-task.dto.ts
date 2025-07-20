import { IsString, IsOptional } from 'class-validator';

export class EditTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  due_date?: string; //ISO 8601
}
