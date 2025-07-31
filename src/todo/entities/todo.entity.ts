import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  name: string;

  @Column()
  isCompleted: boolean;

  @ManyToOne(() => User, (user) => user.todo)
  user: User;
}
