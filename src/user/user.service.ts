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

  create(createUserDto: CreateUserDto, profileImageUrl?: string) {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = 'admin';
    user.profileImage = profileImageUrl ?? null;

    return this.usersRepository.save(user);
  }

  getUserById(id: number) {
    return this.usersRepository.findOneOrFail({ where: { id } });
  }

  findAll() {
    return this.usersRepository.find();
  }

  findUserByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }

  validateGoogleUser(googleUser: CreateUserDto) {
    return this.usersRepository.findOne({
      where: { email: googleUser.email },
    });
  }
}
