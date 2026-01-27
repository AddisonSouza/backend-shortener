import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CorsConfigService } from './config/cors-config.service';
import 'source-map-support/register';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  const corsConfigService = app.get(CorsConfigService);

  // Enable CORS using the dedicated service
  app.enableCors(corsConfigService.createCorsOptions());

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
