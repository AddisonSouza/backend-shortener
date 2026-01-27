import { registerAs } from '@nestjs/config';

export default registerAs('cors', () => ({
  allowedOrigins: process.env.CORS_ALLOWED_ORIGINS
    ? process.env.CORS_ALLOWED_ORIGINS.split(',')
        .map((origin) => origin.trim())
        .filter((origin) => origin.length > 0)
    : [],
  credentials: process.env.CORS_CREDENTIALS === 'true',
  methods: process.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: process.env.CORS_ALLOWED_HEADERS || 'Content-Type,Authorization',
  exposedHeaders: process.env.CORS_EXPOSED_HEADERS || '',
  maxAge: parseInt(process.env.CORS_MAX_AGE || '3600', 10),
}));
