import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitter';
import { config } from 'src/app/shared/module/config-module/config.service';

@Injectable()
export class XStrategy extends PassportStrategy(Strategy, 'twitter') {
  // Ensure 'twitter' is specified as the name
  constructor() {
    super({
      consumerKey: config.getString('TWITTER_CONSUMER_KEY'),
      consumerSecret: config.getString('TWITTER_CONSUMER_SECRET'),
      callbackURL: config.getString('TWITTER_CALLBACK_URL'),
      includeEmail: true,
    });
  }

  async validate(
    token: string,
    tokenSecret: string,
    profile: any,
    done: Function,
  ) {
    const { id, username, emails } = profile;
    const user = {
      twitterId: id,
      username: username,
      email: emails ? emails[0].value : null,
      accessToken: token,
      refreshToken: tokenSecret,
    };

    return done(null, user);
  }
}
