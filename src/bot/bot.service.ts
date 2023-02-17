import { Injectable } from '@nestjs/common';
import { InviteDto } from './dto/invite.dto';
import { PlaceShipDto } from './dto/place-ship.dto';
import { ShootDto } from './dto/shoot.dto';
import { NotifyDto } from './dto/notify.dto';
import { GameOverDto } from './dto/game-over.dto';

@Injectable()
export class BotService {
  private readonly board: Map<string, number> = new Map();
  private readonly coordinateStatus = {
    WATER: 0,
    SHIP: 1
  }
  private readonly shipType = {
    WATER: 0,
    SHIP: 1
  }

  private boardWidth: number = 0
  private boardHeight: number =  0

  invite(inviteDto: InviteDto) {
    this.boardWidth = inviteDto.boardWidth
    this.boardHeight = inviteDto.boardHeight

    this.board.clear()

    for (let y = 0; y < this.boardHeight; y++) {
      for (let x = 0; x < this.boardWidth; x++) {
        this.board.set(''+x+y, this.coordinateStatus.WATER)
      }
    }

    const ships = inviteDto.ships

    ships.forEach(shipType => {
      for (let ship = 0; ship < shipType.quantity; ship++) {
        this.getShipLocation(shipType.type)
      }
    });

    return inviteDto;
  }

  getShipLocation(shipType: string){
    console.log(shipType);
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