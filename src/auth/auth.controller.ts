import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';

interface AuthenticatedRequest extends Request {
  user: User;
}

@Controller('auth')
@ApiTags('Login')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req: AuthenticatedRequest, @Body() loginDto: LoginDto) {
    const user = req.user;

    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    // redirects to Google
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleCallback(@Req() req: AuthenticatedRequest) {
    const user = req.user;

    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Google login successful',
      token,
      user,
    };
  }
}
