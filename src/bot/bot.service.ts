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
import axios, { AxiosResponse } from 'axios'
import * as moment from "moment";
import { Notify2Dto } from './dto/notify2.dto';
import { Coordinate } from './entities/coordinate.entity';
@Injectable()
export class BotService {
  constructor(
    private readonly placeShipService: PlaceShipService,
    private readonly shootService: ShootService,
  ) { }

  private games: Map<string, Game> = new Map()
  getGameBySession(session: string) {
    const game = this.games.get(session);
    if (game) {
      game.setLastAccess(moment())
    }
    return game
  }

  async getShipsPlaceJava(inviteDto: InviteDto): Promise<AxiosResponse> {
    try {
      return await axios.post(process.env.URI_PLACE_SHIP, inviteDto, {
        headers: {
          "Content-Type": "application/json",
        }
      })
    } catch (error) {
      console.log("getShipsPlaceJava", error);
    }
  }
  async invite(inviteDto: InviteDto, session: string) {
    this.deleteOldGames()
    if (this.games.has(session)) {
      return { success: false }
    }
    const game: Game = new Game(session)
    game.setBoardWidth(inviteDto.boardWidth)
    game.setBoardHeight(inviteDto.boardHeight)
    game.setCurrentTactic(process.env.TACTIC)
    game.setLastAccess(moment())

    this.placeShipService.initBoard(game.getMyBoard(), game.getEnemyBoard(), game.getBoardWidth(), game.getBoardHeight())
    this.placeShipService.initHuntShotQueue(game)
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
    const res = await this.getShipsPlaceJava(inviteDto);
    if (res) {
      const myShips: MyShipsDto = res?.data
      if (myShips) {
        this.placeShipService.placeShip(game, myShips)
      }
    }
    this.placeShipService.printBoard(game.getEnemyBoard(), game.getBoardWidth(), game.getBoardHeight())
    this.games.set(session, game);
    return { success: true };
  }

  placeShips(placeShipDto: PlaceShipDto, session: string) {
    const game = this.getGameBySession(session)
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
    console.log("Next shoot!!!");
    const game = this.getGameBySession(session)
    if (!game) {
      return { success: false }
    }
    this.shootService.updateCurrentMission(game)
    let coordinates = []
    if (game.getCurrentMission() === MISSION_TYPE.TARGETING) {
      const shootTarget = this.shootService.targetShip(shootDto, game)
      if (shootTarget.length == 0) {
        game.setCurrentMission(MISSION_TYPE.HUNTING)
      } else {
        coordinates = shootTarget
      }
      game.setCountTargeting(game.getCountTargeting() + coordinates.length)
    }
    if (game.getCurrentMission() === MISSION_TYPE.HUNTING) {
      const shootHunt = this.shootService.huntShip(shootDto, game)
      if (shootHunt.length == 0) {
        coordinates = [[0, 0]]
      } else {
        coordinates = shootHunt
      }
      game.setCountHunting(game.getCountHunting() + coordinates.length)
    }
    console.log("getCountHunting", game.getCountHunting());
    console.log("getCountTargeting", game.getCountTargeting());
    console.log("total hunt: ", game.getCountHunting() + game.getHuntShotQueue().size());

    // this.placeShipService.printBoard(game.getEnemyBoard(), game.getBoardWidth(), game.getBoardHeight())
    return { coordinates };
  }

  notify(notifyDto: NotifyDto, session: string) {
    const game = this.getGameBySession(session)
    if (!game) {
      return { success: false }
    }
    this.shootService.updateShotResult(notifyDto, game)
    this.placeShipService.printBoard(game.getEnemyBoard(), game.getBoardWidth(), game.getBoardHeight())
    console.log("Huntshot remain: ", game.getHuntShotQueue().size())
    return { success: true };
  }

  notify2(i: number, j: number) {
    try {
      this.games.forEach((game) => {
        const huntingQueue = game.getHuntShotQueue();
        huntingQueue.pushToTop(new Coordinate(i, j))
        console.log("Huntshot remain after push to top: ", huntingQueue.size())
      })
    } catch (error) {
      console.log(error);
    }
  }

  gameOver(gameOverDto: GameOverDto, session: string) {
    const game = this.getGameBySession(session)
    if (!game) {
      return { success: false }
    } else {
      this.games.delete(session)
    }
    return { success: true };
  }
  deleteOldGames() {
    const gameSessionOlds = []
    this.games.forEach(game => {
      if (process.env.ENV == 'DEBUG') {
        gameSessionOlds.push(game.getSession())
      } else {
        if (moment().diff(game.getLastAccess(), 'minutes') > 10) {
          gameSessionOlds.push(game.getSession())
        }
      }
    })
    gameSessionOlds.forEach(session => {
      this.games.delete(session)
    });
  }
}
