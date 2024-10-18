import * as Sentry from "@sentry/nestjs"
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import { config } from "src/app/shared/module/config-module/config.service";

Sentry.init({
  dsn: config.getString('SENTRY_DSN'),
  integrations: [
    nodeProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});