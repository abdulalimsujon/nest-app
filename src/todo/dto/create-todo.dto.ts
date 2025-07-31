import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CreateTodoDto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  isCompleted: boolean;

  @Column()
  date: string;

  @ManyToOne(() => User, (user) => user.todo)
  user: User;
}
