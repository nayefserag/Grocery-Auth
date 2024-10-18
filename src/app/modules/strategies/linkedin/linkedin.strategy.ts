import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { VerifyCallback } from 'passport-google-oauth20';
import { Strategy } from 'passport-linkedin-oauth2';
import { Profile } from 'passport-linkedin-oauth2';
import { config } from 'src/app/shared/module/config-module/config.service';

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor() {
    super({
      clientID: config.getString('LINKEDIN_CLIENT_ID'),
      clientSecret: config.getString('LINKEDIN_CLIENT_SECRET'),
      callbackURL: config.getString('LINKEDIN_CALLBACK_URL'),
      scope: ['r_liteprofile', 'r_emailaddress'],
      state: true,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, emails, name, photos } = profile;
    const user = {
      linkedinId: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      profilePhoto: photos[0].value,
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
}
