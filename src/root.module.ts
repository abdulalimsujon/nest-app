import { Module } from '@nestjs/common';
import { bookModule } from './book/book.module';

@Module({
  imports: [bookModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log('i am here');
  }
}
