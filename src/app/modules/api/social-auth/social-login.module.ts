import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GitHubStrategy } from '../../strategies/github/github.strategy';
import { GoogleStrategy } from '../../strategies/gmail/google.stratgy';
import { GithubController } from './controller/github.controller';
import { GmailController } from './controller/gmail.controller';
import { LinkedInController } from './controller/linkedin.controller';
import { XController } from './controller/x.controller';

@Module({
  imports: [],
  providers: [GoogleStrategy, GitHubStrategy],
  controllers: [
    GithubController,
    GmailController,
    LinkedInController,
    XController,
  ],
})
export class SocialLoginModule {}
