import { Controller, Get, Post, Body, Headers, Res, UseInterceptors } from '@nestjs/common';
import { BotService } from './bot.service';
import { InviteDto } from './dto/invite.dto';
import { PlaceShipDto } from './dto/place-ship.dto';
import { ShootDto } from './dto/shoot.dto';
import { NotifyDto } from './dto/notify.dto';
import { GameOverDto } from './dto/game-over.dto';
import { HeaderDto } from './dto/header.dto';
import { HeaderInterceptor } from './bot.interceptor';
import { Response } from 'express';

@Controller('')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Get("/ping")
  ping() {
    return "Server is active now!";
  }

  @Post("/invite")
  @UseInterceptors(HeaderInterceptor)
  create(@Body() inviteDto: InviteDto, @Res() res: Response) {
    const data = this.botService.invite(inviteDto)
    return res.json(data) 
  }

  @Post("/place-ships")
  @UseInterceptors(HeaderInterceptor)
  placeShips(@Body() placeShipDto: PlaceShipDto, @Res() res: Response) {
    const data = this.botService.placeShips(placeShipDto);
    return res.json(data) 
  }

  @Post("/shoot")
  @UseInterceptors(HeaderInterceptor)
  shoot(@Body() shootDto: ShootDto, @Res() res: Response) {
    const data = this.botService.shoot(shootDto);
    return res.json(data) 
  }

  @Post("/notify")
  @UseInterceptors(HeaderInterceptor)
  notify(@Body() notifyDto: NotifyDto, @Res() res: Response) {
    const data = this.botService.notify(notifyDto);
    return res.json(data) 
  }

  @Post("/game-over")
  @UseInterceptors(HeaderInterceptor)
  gameOver(@Body() gameOverDto: GameOverDto, @Res() res: Response) {
    const data = this.botService.gameOver(gameOverDto);
    return res.json(data) 
  }
}
