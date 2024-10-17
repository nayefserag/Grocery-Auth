import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OAuthDto } from 'src/app/modules/application/auth/model/o-auth.dto';
import { OAuthService } from 'src/app/modules/application/social-auth/gmail/services/OAuth.service';

@Controller('github')
export class GithubController {
  constructor(private readonly oAuthService: OAuthService) {}

  // GitHub Auth
  @Get()
  @UseGuards(AuthGuard('github'))
  async githubAuth(@Req() req) {
  }

  @Get('callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthRedirect(@Req() req) {
    console.log(req.user);
    let entity : OAuthDto = req.user;
    entity.provider = 'github'; 
    entity.accessToken = req.user.accessToken
    return await this.oAuthService.authenticate(entity);
  }
}
