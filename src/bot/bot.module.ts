import { CallHandler, ExecutionContext, Injectable, Module, NestInterceptor } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { Observable, tap } from 'rxjs';
import { PlaceShipService } from './logic/placeShip.service';

@Module({
  controllers: [BotController],
  providers: [BotService, PlaceShipService]
})
export class BotModule {}
