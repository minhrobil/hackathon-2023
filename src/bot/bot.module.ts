import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { PlaceShipService } from './logic/placeShip.service';
import { ShootService } from './logic/shoot.service';
import { Stack } from './logic/stack.service';
import { Queue } from './logic/queue.service';
import { Game } from './logic/game.service';

@Module({
  controllers: [BotController],
  providers: [BotService, PlaceShipService, ShootService],
  imports: [Stack, Queue, Game]
})
export class BotModule { }
