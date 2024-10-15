import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { LoginDto } from 'src/app/module/application/auth/model/login.dto';
import { ResetPasswordDto } from 'src/app/module/application/auth/model/reser-password.dto';
import { SignupDto } from 'src/app/module/application/auth/model/sginup.dto';
import { AuthService } from 'src/app/module/application/auth/services/auth.service';
import { JwtAuthGuard } from 'src/app/module/strategies/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() sgingUpDto: SignupDto) {
    return this.authService.signup(sgingUpDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
