import { Module } from '@nestjs/common';
import { CassandraModule } from './cassandra/casandra.module';
import { ShortenerModule } from './shortener/shortener.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { validate } from './config/env.validation';
import corsConfig from './config/cors.config';
import { CorsConfigService } from './config/cors-config.service';

@Module({
  imports: [
    CassandraModule,
    ShortenerModule,
    RedisModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate,
      load: [corsConfig],
    }),
  ],
  providers: [CorsConfigService],
  exports: [CorsConfigService],
})
export class AppModule {}