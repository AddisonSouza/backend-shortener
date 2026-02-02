import {Controller, Post, Get, Body, HttpCode, HttpStatus, Req, Param, Res, UseGuards} from '@nestjs/common';
import {ShortenerService} from './shortener.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@Controller()
export class ShortenerController {

    constructor(private readonly service: ShortenerService) {}

    @Post()
    @UseGuards(ApiKeyGuard)
    @HttpCode(HttpStatus.CREATED)
    createShortUrl(@Body('originalUrl') originalUrl: string, 
    @Req() req
    ) {
        console.log('Received URL to shorten:', originalUrl);
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        return this.service.createShortUrl(originalUrl, baseUrl);
    }

    @Get(':shortCode')
    @HttpCode(HttpStatus.FOUND) //moves temporarily
    async getOriginalUrl(@Param('shortCode') shortCode: string, 
    @Res() res
    ) {
        console.log('Received short code to resolve:', shortCode);
        const originalUrl = await this.service.getOriginalUrl(shortCode);
        return res.redirect(originalUrl);
    }
}