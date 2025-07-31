import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class authController {
  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req: Request) {
    return {
      message: 'Login success',
    };
  }
}
