import { Injectable } from '@nestjs/common';
import { InviteDto } from './dto/invite.dto';
import { PlaceShipDto } from './dto/place-ship.dto';
import { ShootDto } from './dto/shoot.dto';
import { NotifyDto } from './dto/notify.dto';
import { GameOverDto } from './dto/game-over.dto';
import { PlaceShipService } from './logic/placeShip.service';
import { ShootService } from './logic/shoot.service';
import { Coordinate } from './entities/coordinate.entity';
import { COORDINATE_STATUS, MISSION_TYPE, TACTIC } from './constant/constant';
import { Stack } from './logic/stack.service';
@Injectable()
export class BotService {
  constructor(
    private readonly placeShipService: PlaceShipService,
    private readonly shootService: ShootService,
  ) { }

  private readonly currentTactic = TACTIC.TIGER
  private readonly myBoard: Map<string, number> = new Map();//Bản đồ quân ta

  private readonly shipType = {
    WATER: 0,
    SHIP: 1
  }

  private boardWidth = 0
  private boardHeight = 0

  private shipsInMyBoard = []
  private player1 = null
  private player2 = null

  invite(inviteDto: InviteDto) {
    this.boardWidth = inviteDto.boardWidth
    this.boardHeight = inviteDto.boardHeight

    this.myBoard.clear()
    this.shipsInMyBoard = []
    this.player1 = null
    this.player2 = null

    this.placeShipService.initBoard(this.myBoard, this.enemyBoard, this.boardWidth, this.boardHeight)
    // this.placeShipService.initHuntShotStack(this.huntShotStack, this.boardWidth, this.boardHeight, this.currentTactic)

    const shipsInGame = inviteDto.ships

    this.placeShipService.placeShip(this.shipsInMyBoard, shipsInGame, this.myBoard)

    return { success: true };
  }

  placeShips(placeShipDto: PlaceShipDto) {
    this.player1 = placeShipDto.player1
    this.player2 = placeShipDto.player2

    return { ships: this.shipsInMyBoard };
  }

  private readonly enemyBoard: Map<string, number> = new Map(); //Bản đồ quân địch
  private currentMission: number = MISSION_TYPE.HUNTING; //Mission hiện tại
  private readonly huntShotStack: Stack<Coordinate> = new Stack()//Stack các toạ độ sẽ đi hunting theo chiến dịch

  shoot(shootDto: ShootDto) {
    if (this.currentMission === MISSION_TYPE.HUNTING) {
      return this.shootService.huntShip(shootDto, this.enemyBoard, this.huntShotStack);
    }
    if (this.currentMission === MISSION_TYPE.TARGETING) {
      return this.shootService.huntShip(shootDto, this.enemyBoard, this.huntShotStack);
    }
    return { success: true };
  }

  notify(notifyDto: NotifyDto) {
    return notifyDto;
  }

  gameOver(gameOverDto: GameOverDto) {
    return gameOverDto;
  }
}