import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitter';

@Injectable()
export class XStrategy extends PassportStrategy(Strategy, 'twitter') {  // Ensure 'twitter' is specified as the name
    constructor() {
    super({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: 'http://localhost:3000/api/v1/twitter/callback',
      includeEmail: true, // This allows Twitter to provide the user's email
    });
  }

  async validate(token: string, tokenSecret: string, profile: any, done: Function) {
    // Extract relevant data from Twitter profile
    const { id, username, emails } = profile;
    const user = {
      twitterId: id,
      username: username,
      email: emails ? emails[0].value : null,
    };

    // Here you can directly return the user without going to an external service.
    // If needed, you can save the user to your database here.

    // Call the `done` function, passing the user object
    return done(null, user); // You pass `null` as the first argument to indicate no error
  }
}
