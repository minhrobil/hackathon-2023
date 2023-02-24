import { Injectable } from '@nestjs/common';
import { InviteDto } from './dto/invite.dto';
import { PlaceShipDto } from './dto/place-ship.dto';
import { ShootDto } from './dto/shoot.dto';
import { NotifyDto } from './dto/notify.dto';
import { GameOverDto } from './dto/game-over.dto';
import { PlaceShipService } from './logic/placeShip.service';
import { ShootService } from './logic/shoot.service';
import { MISSION_TYPE, SHIP_FINDING_STATUS } from './constant/constant';
import { Game } from './logic/game.service';
import { MyShipsDto } from './dto/myShips.dto';
@Injectable()
export class BotService {
  constructor(
    private readonly placeShipService: PlaceShipService,
    private readonly shootService: ShootService,
  ) { }

  private games: Map<string, Game> = new Map()


  async invite(inviteDto: InviteDto, session: string) {
    if (this.games.has(session)) {
      return { success: false }
    }
    const game: Game = new Game(session)
    game.setBoardWidth(inviteDto.boardWidth)
    game.setBoardHeight(inviteDto.boardHeight)

    this.placeShipService.initBoard(game.getMyBoard(), game.getEnemyBoard(), game.getBoardWidth(), game.getBoardHeight())
    this.placeShipService.initHuntShotQueue(game.getHuntShotQueue(), game.getCurrentTactic())
    // this.placeShipService.printBoard(game.getEnemyBoard(), game.getBoardWidth(), game.getBoardHeight())

    // this.shootService.findNewTargetAreaInMap(game)
    const enermyShips: MyShipsDto = { ships: [] }
    inviteDto.ships.forEach(ship => {
      for (let i = 1; i <= ship.quantity; i++) {
        enermyShips.ships.push({
          type: ship.type,
          coordinates: [],
          status: SHIP_FINDING_STATUS.FINDING
        })
      }
    });
    game.setShipsInEnermyBoard(enermyShips)
    // console.log(enermyShips);

    let myShips: MyShipsDto = null
    try {
      let response = await fetch('http://10.10.2.187:1998/api/place-ship', {
        method: 'POST',
        body: JSON.stringify(inviteDto), // string or object
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // console.log(response);

      if (response.ok) {
        myShips = await response.json()
      }
    } catch (error) {
      // console.log(error);
    }
    if (myShips) {
      this.placeShipService.placeShip(game, myShips)
    }
    this.games.set(session, game);
    return { success: true };
  }

  placeShips(placeShipDto: PlaceShipDto, session: string) {
    const game = this.games.get(session);
    if (!game) {
      return { success: false }
    }

    game.setPlayer1(placeShipDto.player1)
    game.setPlayer2(placeShipDto.player2)

    const ships = game.getShipsInMyBoard()

    return {
      ships: ships.ships.map((ship => {
        return {
          type: ship.type,
          coordinates: ship.coordinates.map(coordinate => [coordinate['x'], coordinate['y']])
        }

      }))
    }
  }

  shoot(shootDto: ShootDto, session: string) {
    const game = this.games.get(session);
    if (!game) {
      return { success: false }
    }
    let coordinates = [[0, 0]]
    if (game.getCurrentMission() === MISSION_TYPE.HUNTING) {
      coordinates.pop()
      coordinates = [...this.shootService.huntShip(shootDto, game)];
    }
    if (game.getCurrentMission() === MISSION_TYPE.TARGETING) {
      coordinates.pop()

      coordinates = [...this.shootService.targetShip(shootDto, game)];
    }
    this.placeShipService.printBoard(game.getEnemyBoard(), game.getBoardWidth(), game.getBoardHeight())
    return { coordinates };
  }

  notify(notifyDto: NotifyDto, session: string) {
    const game = this.games.get(session);
    if (!game) {
      return { success: false }
    }
    this.shootService.updateShotResult(notifyDto, game)
    this.placeShipService.printBoard(game.getEnemyBoard(), game.getBoardWidth(), game.getBoardHeight())
    return { success: true };
  }

  gameOver(gameOverDto: GameOverDto, session: string) {
    const game = this.games.get(session);
    if (!game) {
      return { success: false }
    }

    return { success: true };
  }
}