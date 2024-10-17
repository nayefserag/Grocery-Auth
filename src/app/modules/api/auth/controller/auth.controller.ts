import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Request,
  Response,
  HttpStatus,
  HttpCode,
  Delete,
  Patch,
} from '@nestjs/common';
import { LoginDto } from 'src/app/modules/application/auth/model/login.dto';
import { ResetPasswordDto } from 'src/app/modules/application/auth/model/reset-password.dto';
import { SignupDto } from 'src/app/modules/application/auth/model/signup.dto';
import { AuthService } from 'src/app/modules/application/auth/services/auth.service';
import { JwtAuthGuard } from 'src/app/modules/strategies/jwt/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() signUpDto: SignupDto) {
    return this.authService.signup(signUpDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  @HttpCode(HttpStatus.OK)
  async updateProfile(@Request() req, @Body() body : Partial<SignupDto>) {
    return this.authService.updateProfile(req.user.userId, body);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body('email') email: string) {
    await this.authService.forgotPassword(email);
    return {
      statusCode: HttpStatus.OK,
      message: 'Password reset link has been sent to your email',
    };
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('deactivate-account')
  @HttpCode(HttpStatus.OK)
  async deactivateAccount(@Request() req) {
    await this.authService.deactivateAccount(req.user.userId);
    return { message: 'Account deactivated successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('reactivate-account')
  @HttpCode(HttpStatus.OK)
  async reactivateAccount(@Request() req) {
    await this.authService.reactivateAccount(req.user.userId);
    return { message: 'Account reactivated successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-account')
  @HttpCode(HttpStatus.OK)
  async deleteAccount(@Request() req) {
    await this.authService.deleteAccount(req.user.userId);
    return { message: 'Account deleted successfully' };
  }
}
