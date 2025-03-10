import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }
}
