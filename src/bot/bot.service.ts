import { Injectable } from '@nestjs/common';
import { InviteDto } from './dto/invite.dto';
import { PlaceShipDto } from './dto/place-ship.dto';
import { ShootDto } from './dto/shoot.dto';
import { NotifyDto } from './dto/notify.dto';
import { GameOverDto } from './dto/game-over.dto';

@Injectable()
export class BotService {
  invite(inviteDto: InviteDto) {
    return inviteDto;
  }

  placeShips(placeShipDto: PlaceShipDto) {
    return placeShipDto;
  }

  shoot(shootDto: ShootDto) {
    return shootDto;
  }

  notify(notifyDto: NotifyDto) {
    return notifyDto;
  }

  gameOver(gameOverDto: GameOverDto) {
    return gameOverDto;
  }
}