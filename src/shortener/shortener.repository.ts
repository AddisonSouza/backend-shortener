import {Injectable} from '@nestjs/common';
import { CassandraService } from 'src/cassandra/cassandra.service';

@Injectable()
export class ShortenerRepository {
    constructor(
        private readonly cassandraService: CassandraService,
    ) {}

    async createShortUrl(originalUrl: string, shortCode: string, timestamp: Date): Promise<void> {
        const client = this.cassandraService.getClient();
        const query = 'INSERT INTO short_urls (short_code, original_url, created_at) VALUES (?, ?, ?)';
        await client.execute(query, [shortCode, originalUrl, timestamp], { prepare: true });
    }

    async getOriginalUrl(shortCode: string): Promise<string | null> {
        const client = this.cassandraService.getClient();
        const query = 'SELECT original_url FROM short_urls WHERE short_code = ?';
        const result = await client.execute(query, [shortCode], { prepare: true });

        if (result.rowLength > 0) {
            return result.rows[0]['original_url'];
        }
        return null;
    }
}
