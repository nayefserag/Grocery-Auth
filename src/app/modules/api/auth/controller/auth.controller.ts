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
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from 'src/app/modules/application/auth/model/login.dto';
import { ResetPasswordDto } from 'src/app/modules/application/auth/model/reset-password.dto';
import { SignupDto } from 'src/app/modules/application/auth/model/signup.dto';
import { AuthService } from 'src/app/modules/application/auth/services/auth.service';
import { JwtAuthGuard } from 'src/app/modules/strategies/jwt/jwt.guard';
import { TokenService } from 'src/app/modules/strategies/jwt/jwt.service';
import { config } from 'src/app/shared/module/config-module/config.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() signUpDto: SignupDto, @Response() res) {
    const { access_token, refresh_token, user } =
      await this.authService.signup(signUpDto);

    res.setHeader('Authorization', `Bearer ${access_token}`);
    res.setHeader('x-refresh-token', refresh_token);

    return res.status(HttpStatus.CREATED).json({
      message: 'User signed up successfully',
      user,
      access_token,
      refresh_token,
    });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Response() res) {
    const { access_token, refresh_token } =
      await this.authService.login(loginDto);

    res.setHeader('Authorization', `Bearer ${access_token}`);
    res.setHeader('x-refresh-token', refresh_token);

    return res.status(HttpStatus.OK).json({
      message: 'Login successful',
      access_token,
      refresh_token,
    });
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
  async updateProfile(@Request() req, @Body() body: SignupDto) {
    return this.authService.updateProfile(req.user.userId, body);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body('refresh_token') refreshToken: string, @Response() res) {
    const { access_token } =
      await this.authService.refreshAccessToken(refreshToken);

    res.setHeader('Authorization', `Bearer ${access_token}`);

    return res.status(HttpStatus.OK).json({
      message: 'Access token refreshed',
      access_token,
    });
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

  @Post('complete-registration/:id')
  @HttpCode(HttpStatus.OK)
  async completeRegistration(@Body() body: SignupDto, @Param('id') id: string) {
    return this.authService.updateProfile(body.id, body);
  }

  @Post('send-verification-email')
  @HttpCode(HttpStatus.OK)
  async sendVerificationEmail(@Body('email') email: string) {
    await this.authService.sendVerificationEmail(email);
    return {
      message: 'Verification email sent. Please check your email for the OTP.',
    };
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Body('otp') otp: string, @Body('id') id: string) {
    await this.authService.verifyEmail(id, otp);
    return {
      message: 'Email verified successfully',
    };
  }

  @Post('validate-token')
  async validateToken(@Body('token') token: string) {
    try {
      console.log('token', token);
      const user = await this.tokenService.verify(
        token,
        config.getString('JWT_SECRET'),
      );
      return { isValid: true, user };
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
