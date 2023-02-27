import { Controller, Get, Post, Body, Headers, Res, UseInterceptors, HttpStatus, HttpCode } from '@nestjs/common';
import { BotService } from './bot.service';
import { InviteDto } from './dto/invite.dto';
import { PlaceShipDto } from './dto/place-ship.dto';
import { ShootDto } from './dto/shoot.dto';
import { NotifyDto } from './dto/notify.dto';
import { GameOverDto } from './dto/game-over.dto';
import { HeaderInterceptor } from './bot.interceptor';
import { Response } from 'express';
import { HeaderDto } from './dto/header.dto';

@Controller('')
export class BotController {
  constructor(private readonly botService: BotService) { }

  @Get("/ping")
  ping() {
    return "Server is active now!";
  }

  @Post("/invite")
  @UseInterceptors(HeaderInterceptor)
  async invite(@Body() inviteDto: InviteDto, @Headers() headers: HeaderDto, @Res() res: Response) {
    try {
      const session: string = headers['x-session-id']
      const data = await this.botService.invite(inviteDto, session)
      console.log("/invite", data);
      return res.json(data)
    } catch (error) {
      console.log(error);
    }
  }

  @Post("/place-ships")
  @UseInterceptors(HeaderInterceptor)
  placeShips(@Body() placeShipDto: PlaceShipDto, @Headers() headers: HeaderDto, @Res() res: Response) {
    try {
      const session: string = headers['x-session-id']
      const data = this.botService.placeShips(placeShipDto, session);
      console.log("/place-ships", data);
      return res.json(data)
    } catch (error) {
      console.log(error);
    }
  }

  @Post("/shoot")
  @UseInterceptors(HeaderInterceptor)
  shoot(@Body() shootDto: ShootDto, @Headers() headers: HeaderDto, @Res() res: Response) {
    try {
      const session: string = headers['x-session-id']
      const data = this.botService.shoot(shootDto, session);
      console.log("/shoot", data);
      return res.json(data)
    } catch (error) {
      console.log(error);
    }
  }

  @Post("/notify")
  @UseInterceptors(HeaderInterceptor)
  notify(@Body() notifyDto: NotifyDto, @Headers() headers: HeaderDto, @Res() res: Response) {
    try {
      console.log("/notify-from", notifyDto.playerId);
      const session: string = headers['x-session-id']
      const data = this.botService.notify(notifyDto, session);
      return res.json(data)
    } catch (error) {
      console.log(error);
    }
  }

  @Post("/game-over")
  @UseInterceptors(HeaderInterceptor)
  gameOver(@Body() gameOverDto: GameOverDto, @Headers() headers: HeaderDto, @Res() res: Response) {
    try {
      console.log("GAME OVER!!!!", gameOverDto.statistics);
      console.log("WINNER ", gameOverDto.winner);
      console.log("LOSER", gameOverDto.loser);
      const session: string = headers['x-session-id']
      const data = this.botService.gameOver(gameOverDto, session);
      return res.json(data)
    } catch (error) {
      console.log(error);
    }
  }
}
