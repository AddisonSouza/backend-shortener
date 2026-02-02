import { plainToInstance } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  validateSync,
  IsBoolean,
} from 'class-validator';

export class EnvironmentVariables {
  @IsNumber()
  @IsOptional()
  PORT: number = 3000;

  @IsString()
  @IsNotEmpty()
  CASSANDRA_ADRESS: string;

  @IsString()
  @IsNotEmpty()
  CASSANDRA_LOCAL_DATA_CENTER: string;

  @IsString()
  @IsNotEmpty()
  CASSANDRA_KEYSPACE: string;

  @IsString()
  @IsNotEmpty()
  SALT_BASE_62: string;

  @IsString()
  @IsNotEmpty()
  REDIS_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  REDIS_PORT: number;

  // CORS Configuration
  @IsString()
  @IsNotEmpty()
  CORS_ALLOWED_ORIGINS: string;

  @IsBoolean()
  @IsOptional()
  CORS_CREDENTIALS: boolean = true;

  @IsString()
  @IsOptional()
  CORS_METHODS: string = 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS';

  @IsString()
  @IsOptional()
  CORS_ALLOWED_HEADERS: string = 'Content-Type,Authorization';

  @IsString()
  @IsOptional()
  CORS_EXPOSED_HEADERS: string = '';

  @IsNumber()
  @IsOptional()
  CORS_MAX_AGE: number = 3600;

  @IsString()
  @IsNotEmpty()
  API_KEY: string;
}

export function validate(config: Record<string, unknown>) {
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
