import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('linkedin')
export class LinkedInController {
  @Get()
  @UseGuards(AuthGuard('linkedin'))
  async linkedinAuth() {
    // This initiates LinkedIn OAuth flow
  }

  @Get('callback')
  @UseGuards(AuthGuard('linkedin'))
  linkedinAuthRedirect(@Req() req) {
    // Here you would normally handle the user object
    return req.user;
  }
}
