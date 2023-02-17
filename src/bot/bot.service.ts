import { Injectable } from '@nestjs/common';
import { InviteDto } from './dto/invite.dto';
import { PlaceShipDto } from './dto/place-ship.dto';
import { ShootDto } from './dto/shoot.dto';
import { NotifyDto } from './dto/notify.dto';
import { GameOverDto } from './dto/game-over.dto';
import { PlaceShipService } from './logic/placeShip.service';

@Injectable()
export class BotService {
  constructor(private readonly placeShipService: PlaceShipService) {}

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

  private shipsInMyBoard = []
  private player1 = null
  private player2 = null


  invite(inviteDto: InviteDto) {
    this.boardWidth = inviteDto.boardWidth
    this.boardHeight = inviteDto.boardHeight

    this.board.clear()
    this.shipsInMyBoard = []
    this.player1 = null
    this.player2 = null

    this.placeShipService.initBoard(this.board, this.boardWidth, this.boardHeight, this.coordinateStatus.WATER)

    const shipsInGame = inviteDto.ships

    this.placeShipService.placeShip(this.shipsInMyBoard, shipsInGame, this.board)

    return { success: true };
  }

  placeShips(placeShipDto: PlaceShipDto) {
    this.player1 = placeShipDto.player1
    this.player2 = placeShipDto.player2

    return { ships: this.shipsInMyBoard };
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