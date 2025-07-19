// export class BookDto {
//   id: number;
//   name: string;
// }
import { IsString, IsInt } from 'class-validator';

export class BookDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;
}
