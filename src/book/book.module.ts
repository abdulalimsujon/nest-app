import { Module } from '@nestjs/common';
import { BookController } from './book.controller';

@Module({
  imports: [],
  controllers: [BookController],
  providers: [],
})
export class bookModule {
  constructor() {
    console.log('orders');
  }
}
