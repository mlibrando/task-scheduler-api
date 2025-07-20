import { IsString, IsNotEmpty } from 'class-validator';

export class EditTaskDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
