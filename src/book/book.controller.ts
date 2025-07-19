import { Controller, Get, Param } from '@nestjs/common';

@Controller('/book')
export class BookController {
  @Get('/:id')
  findBookById(@Param('id)) id: string): string {
    return `book by id: ${id}`;
  }
}
    
}