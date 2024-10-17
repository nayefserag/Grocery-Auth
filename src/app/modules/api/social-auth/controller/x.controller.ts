import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OAuthDto } from 'src/app/modules/application/auth/model/o-auth.dto';
import { OAuthService } from 'src/app/modules/application/social-auth/gmail/services/OAuth.service';

@Controller('twitter')
export class XController {
  constructor(private readonly oAuthService: OAuthService) {}
  @Get()
  @UseGuards(AuthGuard('twitter'))
  async twitterLogin() {
  }

  @Get('callback')
  @UseGuards(AuthGuard('twitter'))
  async twitterLoginCallback(@Req() req) {
    let entity: OAuthDto = req.user;
    entity.provider = 'x';
    entity.accessToken = req.user.accessToken;
    return await this.oAuthService.authenticate(entity);
  }
}
