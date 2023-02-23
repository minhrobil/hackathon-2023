import { Injectable } from '@nestjs/common';
import { InviteDto } from './dto/invite.dto';
import { PlaceShipDto } from './dto/place-ship.dto';
import { ShootDto } from './dto/shoot.dto';
import { NotifyDto } from './dto/notify.dto';
import { GameOverDto } from './dto/game-over.dto';
import { PlaceShipService } from './logic/placeShip.service';
import { ShootService } from './logic/shoot.service';
import { MISSION_TYPE } from './constant/constant';
import { Game } from './logic/game.service';
@Injectable()
export class BotService {
  constructor(
    private readonly placeShipService: PlaceShipService,
    private readonly shootService: ShootService,
  ) { }

  private games: Map<string, Game> = new Map()

  
  invite(inviteDto: InviteDto, session: string) {
    if(this.games.has(session)){
      return { success: false }
    }
    const game: Game = new Game(session)
    game.setBoardWidth(inviteDto.boardWidth)
    game.setBoardHeight(inviteDto.boardHeight)

    this.placeShipService.initBoard(game.getMyBoard(), game.getEnemyBoard(), game.getBoardWidth(), game.getBoardHeight())
    this.placeShipService.initHuntShotQueue(game.getHuntShotQueue(), game.getCurrentTactic())
    const shipsInGame = inviteDto.ships
    this.placeShipService.placeShip(game.getShipsInMyBoard(), shipsInGame, game.getMyBoard())
    this.games.set(session, game);
    return { success: true };
  }

  placeShips(placeShipDto: PlaceShipDto, session: string) {
    const game = this.games.get(session);
    if(!game){
      return { success: false }
    }

    game.setPlayer1(placeShipDto.player1)
    game.setPlayer2(placeShipDto.player2)

    return { ships: game.getShipsInMyBoard() };
  }

  shoot(shootDto: ShootDto, session: string) {
    const game = this.games.get(session);
    if(!game){
      return { success: false }
    }
    let coordinates = [[0,0]]
    game.setCurrentMission(MISSION_TYPE.TARGETING)
    if (game.getCurrentMission() === MISSION_TYPE.HUNTING) {
      coordinates.pop()
      coordinates = [...this.shootService.huntShip(shootDto, game)];
    }
    if (game.getCurrentMission() === MISSION_TYPE.TARGETING) {
      coordinates.pop()

      coordinates = [...this.shootService.targetShip(shootDto, game)];
    }
    return { coordinates };
  }

  notify(notifyDto: NotifyDto, session: string) {
    const game = this.games.get(session);
    if(!game){
      return { success: false }
    }
    this.shootService.updateShotResult(notifyDto, game)
    this.placeShipService.printBoard(game.getEnemyBoard(),game.getBoardWidth(),game.getBoardHeight())
    return { success: true };
  }

  gameOver(gameOverDto: GameOverDto, session: string) {
    const game = this.games.get(session);
    if(!game){
      return { success: false }
    }

    return { success: true };
  }
}