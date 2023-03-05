import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsString,
  IsNumber,
  IsOptional,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  public NODE_ENV: Environment;

  @IsNumber()
  public PORT: number;

  @IsNumber()
  public PER_PAGE: number;

  @IsOptional()
  @IsString()
  public SWAGGER_PREFIX: string;
}

export type Config = keyof EnvironmentVariables;

export function validateConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
