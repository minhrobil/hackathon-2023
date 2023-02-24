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
  constructor(private readonly botService: BotService) {}

  @Get("/ping")
  ping() {
    return "Server is active now!";
  }

  @Post("/invite")
  // @UseInterceptors(HeaderInterceptor)
  @HttpCode(200)
  async invite(@Body() inviteDto: InviteDto,@Headers() headers: HeaderDto, @Res() res: Response){
    const session: string = headers['x-session-id'] 
    const token: string = headers['x-token'] 
    res.setHeader('x-session-id', session)
    res.setHeader('x-token', token)

    // const data = await this.botService.invite(inviteDto, session)
    console.log("invite", res.json());
    return res.json("data") 
    // console.log("minh");
    
    // return res.json({}) 
  }

  @Post("/place-ships")
  @UseInterceptors(HeaderInterceptor)
  @HttpCode(200)
  placeShips(@Body() placeShipDto: PlaceShipDto,@Headers() headers: HeaderDto, @Res() res: Response) {
    const session: string = headers['x-session-id'] 
    const data = this.botService.placeShips(placeShipDto, session);
    // console.log("place-ships", res.json(data) );
    return res.json(data) 
  }

  @Post("/shoot")
  @UseInterceptors(HeaderInterceptor)
  @HttpCode(200)
  shoot(@Body() shootDto: ShootDto,@Headers() headers: HeaderDto, @Res() res: Response) {
    const session: string = headers['x-session-id']
    const data = this.botService.shoot(shootDto, session);
    return res.json(data)
  }

  @Post("/notify")
  @UseInterceptors(HeaderInterceptor)
  @HttpCode(200)
  notify(@Body() notifyDto: NotifyDto,@Headers() headers: HeaderDto, @Res() res: Response) {
    const session: string = headers['x-session-id']
    const data = this.botService.notify(notifyDto, session);
    return res.json(data) 
  }

  @Post("/game-over")
  @UseInterceptors(HeaderInterceptor)
  @HttpCode(200)
  gameOver(@Body() gameOverDto: GameOverDto,@Headers() headers: HeaderDto, @Res() res: Response) {
    const session: string = headers['x-session-id']
    const data = this.botService.gameOver(gameOverDto, session);
    return res.json(data) 
  }
}
