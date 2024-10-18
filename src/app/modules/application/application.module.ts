import { Module } from '@nestjs/common';
import { GitHubStrategy } from '../strategies/github/github.strategy';
import { GoogleStrategy } from '../strategies/gmail/google.stratgy';
import { ApiModule } from '../api/api.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [ApiModule],
  controllers: [],
  providers: [GoogleStrategy, GitHubStrategy, ConfigService],
  exports: [],
})
export class ApplicationModule {}
