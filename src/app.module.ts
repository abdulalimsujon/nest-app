import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/entities/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'lifeless123',
      database: 'todo_db',
      logging: true,
      autoLoadEntities: true,
      entities: [User, Todo],
      synchronize: true,
    }),
    UserModule,
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
