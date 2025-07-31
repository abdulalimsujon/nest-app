import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  title: string;
  password: string;
}
