import * as Joi from '@hapi/joi';

import { Injectable } from '@nestjs/common';

import * as dotenv from 'dotenv';

import * as fs from 'fs';

import IEnvConfigInterface from '../../interfaces/IEnvConfigInterface';

@Injectable()
export class ConfigModuleService {
  private static instance = null;

  public envConfig: IEnvConfigInterface;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));

    this.envConfig = this.validateInput(config as any);
  }

  static getInstance(): ConfigModuleService {
    if (this.instance == null) {
      this.instance = new ConfigModuleService(
        `${process.env.NODE_ENV || ''}.env`,
      );
    }

    return this.instance;
  }

  getString(key: keyof IEnvConfigInterface) {
    return this.envConfig[key];
  }

  getNumber(key: keyof IEnvConfigInterface): number {
    return parseFloat(String(this.envConfig[key]));
  }

  /*

  Ensures all needed variables are set, and returns the validated JavaScript object

  including the applied default values.

  */

  private validateInput(envConfig: IEnvConfigInterface): IEnvConfigInterface {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({

      HTTP_TIMEOUT: Joi.number().default(30000),

      HTTP_MAX_REDIRECTS: Joi.number().default(5),

    }).unknown(true);

    const { error, value: validatedEnvConfig } =
      envVarsSchema.validate(envConfig);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }
}

const config = ConfigModuleService.getInstance();

export { config };
