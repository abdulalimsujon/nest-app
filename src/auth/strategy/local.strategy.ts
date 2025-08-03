import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException(`User not found with email: ${email}`);
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid password');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
