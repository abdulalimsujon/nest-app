import { Todo } from 'src/todo/entities/todo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @Column()
  password: string;
  @Column({ type: 'varchar', nullable: true })
  profileImage: string | null;

  @OneToMany(() => Todo, (todo) => todo.user)
  todo: Todo[];
}
