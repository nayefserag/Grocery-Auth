import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('github')
export class GithubController {

  // GitHub Auth
  @Get()
  @UseGuards(AuthGuard('github'))
  async githubAuth(@Req() req) {
    // Guard redirects to GitHub
  }

  @Get('callback')
  @UseGuards(AuthGuard('github'))
  githubAuthRedirect(@Req() req) {
    return {
      message: 'GitHub Authentication Successful',
      user: req.user,
    };
  }
}
