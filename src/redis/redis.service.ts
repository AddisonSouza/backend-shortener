import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private redis: Redis;

    constructor() {
        this.redis = new Redis({
            host: process.env.REDIS_HOST || 'localhost',
            port: Number(process.env.REDIS_PORT) || 6379,
        });
    }

    async onModuleInit() {
        try {
            await this.redis.ping();
            console.log('Connected to Redis successfully');
        } catch (error) {
            console.error('Failed to connect to Redis:', error);
        }
    }

    async onModuleDestroy() {
        await this.redis.quit();
        console.log('Disconnected from Redis');
    }

    async get(key: string): Promise<string | null> {
        try {
            console.log(`Getting value for key: ${key}`);
            return await this.redis.get(key);
        } catch (error) {
            console.error(`Error getting value for key ${key}:`, error);
            return null;
        }
    }

    async set(key: string, value: string, ttl?: number): Promise<'OK' | null> {
        try {
            console.log(`Setting value for key: ${key}`);
            if (ttl) {
                return await this.redis.set(key, value, 'EX', ttl);
            }
            return await this.redis.set(key, value);
        } catch (error) {
            console.error(`Error setting value for key ${key}:`, error);
            return null;
        }
    }

    async incr(key: string): Promise<number | null> {
        try {
            console.log(`Incrementing value for key: ${key}`);
            return await this.redis.incr(key);
        } catch (error) {
            console.error(`Error incrementing value for key ${key}:`, error);
            return null;
        }
    }

    getClient(): Redis {
        return this.redis;
    }
}