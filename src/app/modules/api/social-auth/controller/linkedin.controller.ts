import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OAuthDto } from 'src/app/modules/application/auth/model/o-auth.dto';
import { OAuthService } from 'src/app/modules/application/social-auth/gmail/services/OAuth.service';

@Controller('linkedin')
export class LinkedInController {
  constructor(private readonly oAuthService: OAuthService) {}
  @Get()
  @UseGuards(AuthGuard('linkedin'))
  async linkedinAuth() {
    // This initiates LinkedIn OAuth flow
  }

  @Get('callback')
  @UseGuards(AuthGuard('linkedin'))
  async linkedinAuthRedirect(@Req() req) {
    let entity: OAuthDto = req.user;
    entity.provider = 'github';
    entity.accessToken = req.user.accessToken;
    return await this.oAuthService.authenticate(entity);
  }
}
