import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: any;
}

export class ConfigService {
  private static instance: ConfigService = null;
  private readonly env: EnvConfig;

  constructor(filePath: string = './.env') {
    const configs = dotenv.parse(fs.readFileSync(filePath)); // Load .env file
    this.env = this.validateInput(configs); // Validate and parse the configs
  }

  // Singleton pattern to get the ConfigService instance
  static getInstance(): ConfigService {
    if (!this.instance) {
      this.instance = new ConfigService(`${process.env.NODE_ENV || ''}.env`);
    }
    return this.instance;
  }

  // Getter methods to fetch environment variables
  getString(key: string): string {
    return this.env[key];
  }

  getNumber(key: string): number {
    return parseFloat(this.env[key]);
  }

  getBoolean(key: string): boolean {
    return this.env[key] === 'true';
  }

  // Validate the environment variables using Joi
  private validateInput(env: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      PORT: Joi.number().default(5000),

      // Database-related environment variables
      DATABASE_HOST: Joi.string().required(),
      DATABASE_PORT: Joi.number().default(3306),
      DATABASE_USERNAME: Joi.string().required(),
      DATABASE_PASSWORD: Joi.string().required(),
      DATABASE_SCHEMA: Joi.string().required(),
      DATABASE_SYNCHRONIZE: Joi.boolean().default(false),
      DATABASE_LOGGING: Joi.boolean().default(false),

      // RabbitMQ-related environment variables
      RABBITMQ_1_HOST: Joi.string().required(),
      RABBITMQ_1_PORT: Joi.number().default(5672),
      RABBITMQ_1_USER_NAME: Joi.string().required(),
      RABBITMQ_1_PASSWORD: Joi.string().required(),
      RABBITMQ_1_VHOST: Joi.string().default('/'),
      RABBITMQ_1_HEART_BEAT: Joi.number().default(15),
      RABBITMQ_PREFETCH_COUNT: Joi.number().default(10),

      // Notification service-related environment variables
      NOTIFICATION_FORGET_PASSWORD_EMAIL_QUEUE: Joi.string().required(),
      NOTIFICATION_SERVICE_URL: Joi.string().uri().required(),

      // JWT and security-related environment variables
      JWT_SECRET: Joi.string().required(),
      JWT_SECRET_REFRESH: Joi.string().required(),
      SALT_ROUNDS: Joi.number().default(10),
      RESET_PASSWORD_SECRET: Joi.string().required(),

      // OAuth related environment variables
      GOOGLE_CLIENT_ID: Joi.string().required(),
      GOOGLE_CLIENT_SECRET: Joi.string().required(),
      GOOGLE_CALLBACK_URL: Joi.string().uri().required(),

      GITHUB_CLIENT_ID: Joi.string().required(),
      GITHUB_CLIENT_SECRET: Joi.string().required(),
      GITHUB_CALLBACK_URL: Joi.string().uri().required(),

      LINKEDIN_CLIENT_ID: Joi.string().required(),
      LINKEDIN_CLIENT_SECRET: Joi.string().required(),
      LINKEDIN_CALLBACK_URL: Joi.string().uri().required(),

      TWITTER_CONSUMER_KEY: Joi.string().required(),
      TWITTER_CONSUMER_SECRET: Joi.string().required(),
      TWITTER_CALLBACK_URL: Joi.string().uri().required(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(env, {
      allowUnknown: true,
    });

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}

const config = ConfigService.getInstance();
export { config };
