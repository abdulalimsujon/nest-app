import { IsString, IsBoolean } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  title: string;

  @IsString()
  name: string;

  @IsBoolean()
  isCompleted: boolean;
}
