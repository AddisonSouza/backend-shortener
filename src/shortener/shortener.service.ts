import { Injectable } from "@nestjs/common";
import { ShortenerRepository } from "./shortener.repository";
import { ApiResponse } from "src/common/api-response";
import Hashids from 'hashids';
import { BASE_62, KEY_SHORTENER_REDIS, REDIS_EXPIRATION_TIME, REDIS_KEY_PREFIX } from "./shortener.constants";
import { RedisService } from "src/redis/redis.service";
import { DataUtil } from "src/common/data.util";

@Injectable()
export class ShortenerService {
    private hashids: Hashids;
    constructor(
        private readonly repository: ShortenerRepository,
        private readonly redisService: RedisService) 
    {
        this.hashids = new Hashids(process.env.SALT_BASE_62, 6, BASE_62);
    }

    async createShortUrl(originalUrl: string, baseUrl: string): Promise<ApiResponse<string>> {
        try {
            const shortCode = await this.generateShortCode();
            console.log('Generated short code:', shortCode);
            await this.repository.createShortUrl(originalUrl, await shortCode, DataUtil.timestampNow());
            const shortUrl = `${baseUrl}/${shortCode}`;
            return ApiResponse.success(shortUrl, "Short URL created successfully");
        } catch (error) {
            console.error('Error creating short URL:', error);
            return ApiResponse.failure("Failed to create short URL");
        }
        
    }

    async getOriginalUrl(shortCode: string): Promise<string | null> {
        try {
            const cachedUrl = await this.redisService.get(REDIS_KEY_PREFIX + shortCode);

            if (cachedUrl) {
                console.log('Cache hit for short code:', shortCode);
                return cachedUrl;
            }

            console.log('Cache miss for short code:', shortCode);

            const originalUrl = await this.repository.getOriginalUrl(shortCode);
            if (!originalUrl)
                return null;

            this.redisService.set(REDIS_KEY_PREFIX + shortCode, originalUrl, REDIS_EXPIRATION_TIME);
            return originalUrl;

        } catch (error) {
            console.error('Error retrieving original URL:', error);
            return null;
        }
    }

    private async generateShortCode(): Promise<string> {
        const id = await this.redisService.incr(KEY_SHORTENER_REDIS);
        console.log('Generated unique ID from Redis:', id);
        if (id === null) 
            throw new Error('Failed to generate unique ID');
        
        return this.hashids.encode(id);
    }
}