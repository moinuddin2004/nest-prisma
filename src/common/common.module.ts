import { Module } from '@nestjs/common';
import { MailService } from './services/mail.service';
import { AppLogger } from './services/logger.service';

@Module({
    imports: [],
    providers: [MailService, AppLogger],
    exports: [MailService, AppLogger],
    controllers: [],
})
export class CommonModule { }
