// import {
//   ArgumentMetadata,
//   BadRequestException,
//   PipeTransform,
// } from '@nestjs/common';
// import { BookDto } from '../dto/book.dto';
// import { plainToInstance } from 'class-transformer';
// import { validate } from 'class-validator';

// export class BookPipe implements PipeTransform {
//   async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
//     const bookClass = plainToInstance(BookDto, value);
//     const errors = await validate(bookClass);

//     if (errors.length > 0) {
//       throw new BadRequestException({
//         message: 'Validation failed',
//         errors: errors.map((err) => ({
//           property: err.property,
//           constraints: err.constraints,
//         })),
//       });
//     }

//     return bookClass;
//   }
// }
