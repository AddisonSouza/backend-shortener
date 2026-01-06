import {Module} from '@nestjs/common';
import {ShortenerController} from './shortener.controller';
import {ShortenerService} from './shortener.service';
import { ShortenerRepository } from './shortener.repository';

@Module({
    controllers: [ShortenerController],
    providers: [ShortenerService, ShortenerRepository],
})
export class ShortenerModule {}