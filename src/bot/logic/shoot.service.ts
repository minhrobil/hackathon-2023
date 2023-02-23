import { Injectable } from '@nestjs/common';
import { ShootDto } from '../dto/shoot.dto';
import { Coordinate } from '../entities/coordinate.entity';
import { Queue } from './queue.service';
import { Game } from './game.service';
import { COORDINATE_STATUS, MY_PLAYER_ID, STATUS_SHOT } from '../constant/constant';
import { NotifyDto } from '../dto/notify.dto';

@Injectable()
export class ShootService {
  huntShip(shootDto: ShootDto, game: Game) {
    const huntShotQueue = game.getHuntShotQueue()
    const result = []
    //Kiem tra gia tri queue pop co the ban khong, neu co thi lay ra ban, neu khong thi loai bo
    while (result.length == 0) {
      if (this.isCoordinateAvailableForShot(huntShotQueue.peek(), game)) {
        result.push(huntShotQueue.pop())
      } else {
        huntShotQueue.pop()
      }
    }
    return result.map((coordinate: Coordinate) => [coordinate.x, coordinate.y])
  }
  targetShip(shootDto: ShootDto, game: Game) {
    const result = this.findCoorinatesAvailableAround(new Coordinate(1, 1), game)
    return result.map(coordinate => [coordinate.x, coordinate.y])
  }
  updateShotResult(notifyDto: NotifyDto, game: Game) {
    if (notifyDto.playerId != MY_PLAYER_ID) {
      return
    }
    const enemyBoard = game.getEnemyBoard()
    notifyDto.shots.forEach(shot => {
      const key_coordinate = '' + shot.coordinate[0] + shot.coordinate[1]
      if (shot.status == STATUS_SHOT.HIT) {
        enemyBoard.set(key_coordinate, COORDINATE_STATUS.SHIP)
      }
      if (shot.status == STATUS_SHOT.MISS) {
        enemyBoard.set(key_coordinate, COORDINATE_STATUS.SHOT)
      }
    });
    notifyDto.sunkShips.forEach(sunkShip => {
      sunkShip.coordinates.forEach(coordinate=>{
        const key_coordinate = '' + coordinate[0] + coordinate[1]
        enemyBoard.set(key_coordinate, COORDINATE_STATUS.SUNK)
      })
    })
  }
  isCoordinateAvailableForShot(coordinate: Coordinate, game: Game): boolean {
    const board = game.getEnemyBoard()
    const coordinateStatus = board.get('' + coordinate.x + coordinate.y)
    if (coordinateStatus && coordinateStatus == COORDINATE_STATUS.WATER) {
      return true
    }
    return false
  }
  findCoorinatesAvailableAround(coordinate: Coordinate, game: Game): Array<Coordinate> {
    const board = game.getEnemyBoard()
    let up = null;
    let down = null;
    let right = null;
    let left = null;
    const result = new Array()
    if (coordinate.y < game.getBoardHeight() - 1) {
      const new_y = coordinate.y + 1;
      if (board.get('' + coordinate.x + new_y) === COORDINATE_STATUS.WATER) {
        up = new Coordinate(coordinate.x, new_y)
        result.push(up)
      }
    }
    if (coordinate.y > 0) {
      const new_y = coordinate.y - 1;
      if (board.get('' + coordinate.x + new_y) === COORDINATE_STATUS.WATER) {
        down = new Coordinate(coordinate.x, new_y)
        result.push(down)
      }
    }
    if (coordinate.x > 0) {
      const new_x = coordinate.x - 1;
      if (board.get('' + new_x + coordinate.y) === COORDINATE_STATUS.WATER) {
        left = new Coordinate(new_x, coordinate.y)
        result.push(left)
      }
    }
    if (coordinate.x < game.getBoardWidth() - 1) {
      const new_x = coordinate.x + 1;
      if (board.get('' + new_x + coordinate.y) === COORDINATE_STATUS.WATER) {
        right = new Coordinate(new_x, coordinate.y)
        result.push(right)
      }
    }
    return result
  }
}