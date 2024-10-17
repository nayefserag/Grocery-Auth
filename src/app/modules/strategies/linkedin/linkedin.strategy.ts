import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { VerifyCallback } from 'passport-google-oauth20';
import { Strategy } from 'passport-linkedin-oauth2';
import { Profile } from 'passport-linkedin-oauth2';

@Injectable()

export class LinkedInStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor() {
    super({
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/v1/linkedin/callback',
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
    };
    done(null, user);
  }
}
