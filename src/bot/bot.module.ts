import { CallHandler, ExecutionContext, Injectable, Module, NestInterceptor } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { Observable, tap } from 'rxjs';

@Module({
  controllers: [BotController],
  providers: [BotService]
})
export class BotModule {}
