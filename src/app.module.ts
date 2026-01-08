import { Module } from '@nestjs/common';
import { CassandraModule } from './cassandra/casandra.module';
import { ShortenerModule } from './shortener/shortener.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [CassandraModule, ShortenerModule, RedisModule, ConfigModule.forRoot({envFilePath: '.env'})],
})
export class AppModule {}