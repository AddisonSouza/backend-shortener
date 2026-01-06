import { Injectable } from "@nestjs/common";
import { ShortenerRepository } from "./shortener.repository";

@Injectable()
export class ShortenerService {
    constructor(private readonly repository: ShortenerRepository,) {}

    async createShortUrl(originalUrl: string): Promise<string> {
        const shortCode = Math.random().toString(36).substring(2, 8);
        await this.repository.createShortUrl(originalUrl, shortCode);
        return shortCode;
    }

    async getOriginalUrl(shortCode: string): Promise<string | null> {
        return this.repository.getOriginalUrl(shortCode);
    }
}