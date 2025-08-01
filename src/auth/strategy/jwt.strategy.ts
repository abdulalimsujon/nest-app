import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // ✅ called as a function
      ignoreExpiration: false,
      secretOrKey: 'mySuperSecretKey123', // ✅ hardcoded secret
    });
  }

  async validate(payload: any): Promise<any> {
    // You could validate from DB with userService if needed
    return {
      id: payload.id,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      role: payload.role,
    };
  }
}
