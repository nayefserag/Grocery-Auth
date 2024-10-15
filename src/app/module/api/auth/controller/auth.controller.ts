import { Body, Controller, Post, UseGuards, Get, Request } from '@nestjs/common';
import { SignupDto } from 'src/app/module/application/auth/model/sginup.dto';
import { AuthService } from 'src/app/module/application/auth/services/auth.service';
import { JwtAuthGuard } from 'src/app/module/strategies/jwt.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Signup route
  @Post('signup')
  async signup(@Body() sgingUpDto: SignupDto) {
    return this.authService.signup(sgingUpDto);
  }

  // Login route
  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string) {
    return this.authService.login(username, password);
  }

  // Protected route example
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // Contains the JWT payload
  }
}
