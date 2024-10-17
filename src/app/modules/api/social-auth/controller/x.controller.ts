import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('twitter')
export class XController {
  // Route to start Twitter login
  @Get()
  @UseGuards(AuthGuard('twitter'))
  async twitterLogin() {
    // This route will redirect the user to Twitter for authentication
  }

  // Callback after Twitter authentication
  @Get('callback')
  @UseGuards(AuthGuard('twitter'))
  twitterLoginCallback(@Req() req) {
    // Twitter authentication complete, Twitter will redirect to this URL.
    // req.user will contain the authenticated user's profile information
    return req.user;
  }
}
