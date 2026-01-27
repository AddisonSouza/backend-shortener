import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CorsOptions, CorsOptionsDelegate } from '@nestjs/common/interfaces/external/cors-options.interface';

@Injectable()
export class CorsConfigService {
  constructor(private configService: ConfigService) {}

  createCorsOptions(): CorsOptions | CorsOptionsDelegate<any> {
    const allowedOrigins: string[] = this.configService.get<string[]>('cors.allowedOrigins', []);
    const credentials: boolean = this.configService.get<boolean>('cors.credentials', true);
    const methods: string = this.configService.get<string>('cors.methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    const allowedHeaders: string = this.configService.get<string>('cors.allowedHeaders', 'Content-Type,Authorization');
    const exposedHeaders: string = this.configService.get<string>('cors.exposedHeaders', '');
    const maxAge: number = this.configService.get<number>('cors.maxAge', 3600);

    return {
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, Postman)
        if (!origin) {
          return callback(null, true);
        }

        // Check if the origin is in the allowed list or if wildcard is enabled
        if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        // Check for pattern matching (e.g., *.example.com)
        const isAllowed = allowedOrigins.some((allowedOrigin) => {
          if (allowedOrigin.startsWith('*.')) {
            const domain = allowedOrigin.slice(2);
            return origin.endsWith(domain);
          }
          return false;
        });

        if (isAllowed) {
          return callback(null, true);
        }

        console.error(`CORS blocked origin: ${origin}. Allowed origins:`, allowedOrigins);
        return callback(new Error('Not allowed by CORS'));
      },
      credentials,
      methods,
      allowedHeaders,
      exposedHeaders,
      maxAge,
    };
  }
}
