import { Injectable } from "@nestjs/common";
import { ShortenerRepository } from "./shortener.repository";
import { ApiResponse } from "src/common/api-response";

@Injectable()
export class ShortenerService {
    constructor(private readonly repository: ShortenerRepository,) {}

    async createShortUrl(originalUrl: string): Promise<ApiResponse<string>> {
        const shortCode = Math.random().toString(36).substring(2, 8);
        await this.repository.createShortUrl(originalUrl, shortCode);
        return ApiResponse.success(shortCode, "Short URL created successfully");
    }

    async getOriginalUrl(shortCode: string): Promise<string | null> {
        const originalUrl = await this.repository.getOriginalUrl(shortCode);
        if (originalUrl) {
            console.log('Original URL found:', originalUrl);
            return originalUrl
        } else {
            console.log('Original URL not found for short code:', shortCode);
            return "Url Not Found";
        }
    }
}