import { Module } from '@nestjs/common';
import { CassandraModule } from './cassandra/casandra.module';
import { ShortenerModule } from './shortener/shortener.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CassandraModule, ShortenerModule, ConfigModule.forRoot({envFilePath: '.env'})],
})
export class AppModule {}