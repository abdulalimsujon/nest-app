import { Module } from '@nestjs/common';
import { userModule } from './users.module';
import { OrderModule } from './orders.module';

@Module({
  imports: [userModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log('i am here');
  }
}
