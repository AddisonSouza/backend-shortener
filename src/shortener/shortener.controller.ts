import {Controller, Post, Get, Body} from '@nestjs/common';
import {ShortenerService} from './shortener.service';

@Controller('shortener')
export class ShortenerController {

    constructor(private readonly service: ShortenerService) {}

    @Post()
    createShortUrl(@Body() originalUrl: string) {
        return this.service.createShortUrl(originalUrl);
    }

    @Get()
    getOriginalUrl(@Body() shortCode: string) {
        return this.service.getOriginalUrl(shortCode);
    }
}