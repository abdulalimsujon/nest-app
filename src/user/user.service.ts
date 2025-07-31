import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const user: User = new User();
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.password = createUserDto.password;
    user.role = 'user';
    return this.usersRepository.save(user);
  }

  getUserById(id: number) {
    return this.usersRepository.findOneOrFail({ where: { id: id } });
  }

  findAll() {
    return this.usersRepository.find();
  }

  findUserByEmail(email: string) {
    return this.usersRepository.findOneOrFail({ where: { email: email } });
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
