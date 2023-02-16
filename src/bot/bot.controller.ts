import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BotService } from './bot.service';
import { InviteDto } from './dto/invite.dto';
import { PlaceShipDto } from './dto/place-ship.dto';
import { ShootDto } from './dto/shoot.dto';
import { NotifyDto } from './dto/notify.dto';
import { GameOverDto } from './dto/game-over.dto';

@Controller('')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Get("/ping")
  ping() {
    return "Server is active now!";
  }

  @Post("/invite")
  create(@Body() inviteDto: InviteDto) {
    return this.botService.invite(inviteDto);
  }

  @Post("/place-ships")
  placeShips(@Body() placeShipDto: PlaceShipDto) {
    return this.botService.placeShips(placeShipDto);
  }

  @Post("/shoot")
  shoot(@Body() shootDto: ShootDto) {
    return this.botService.shoot(shootDto);
  }

  @Post("/notify")
  notify(@Body() notifyDto: NotifyDto) {
    return this.botService.notify(notifyDto);
  }

  @Post("/game-over")
  gameOver(@Body() gameOverDto: GameOverDto) {
    return this.botService.gameOver(gameOverDto);
  }
}
