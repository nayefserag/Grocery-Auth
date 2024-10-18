import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { VerifyCallback } from 'passport-google-oauth20';
import { config } from 'src/app/shared/module/config-module/config.service';

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: config.getString('GITHUB_CLIENT_ID'),
      clientSecret: config.getString('GITHUB_CLIENT_SECRET'),
      callbackURL: config.getString('GITHUB_CALLBACK_URL'),
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { username, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      username,
      picture: photos[0]?.value,
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
}
