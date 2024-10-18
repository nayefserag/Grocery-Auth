import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OAuthDto } from 'src/app/modules/application/auth/model/o-auth.dto';
import { OAuthService } from 'src/app/modules/application/social-auth/gmail/services/OAuth.service';

@Controller('google')
export class GmailController {
  constructor(private readonly oAuthService: OAuthService) {}
  // Google Auth
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // Guard redirects to Google
  }

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    let entity: OAuthDto = req.user;
    entity.provider = 'google';
    entity.accessToken = req.user.accessToken;
    return await this.oAuthService.authenticate(entity);
  }
}
