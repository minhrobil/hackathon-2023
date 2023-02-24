import { Injectable } from '@nestjs/common';
import { ShootDto } from '../dto/shoot.dto';
import { Coordinate } from '../entities/coordinate.entity';
import { Queue } from './queue.service';
import { Game } from './game.service';
import { COORDINATE_STATUS, FOUR_SHAPE_AREA_TYPE, MISSION_TYPE, MULTIPLE_SHAPE_AREA_TYPE, MY_PLAYER_ID, SHIP_FINDING_STATUS, STATUS_SHOT, THREE_SHAPE_AREA_TYPE, TWO_SHAPE_AREA_TYPE } from '../constant/constant';
import { NotifyDto } from '../dto/notify.dto';
import { MyShipsDto } from '../dto/myShips.dto';

@Injectable()
export class ShootService {
  huntShip(shootDto: ShootDto, game: Game) {
    const huntShotQueue = game.getHuntShotQueue()
    const result = []
    //Kiem tra gia tri queue pop co the ban khong, neu co thi lay ra ban, neu khong thi loai bo
    if (huntShotQueue.size() == 0) return []
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
    const targetShotQueue = game.getTargetShotQueue()
    const result = []
    if (targetShotQueue.size() == 0) return []

    if (shootDto.maxShots <= targetShotQueue.size()) {
      for (let i = 1; i <= shootDto.maxShots; i++) {
        result.push(targetShotQueue.pop())
      }
    } else {
      while (targetShotQueue.size()) {
        result.push(targetShotQueue.pop())
      }
    }
    return result.map(coordinate => [coordinate.x, coordinate.y])
  }
  updateShotResult(notifyDto: NotifyDto, game: Game) {
    if (notifyDto.playerId != MY_PLAYER_ID) {
      return
    }
    const enemyBoard = game.getEnemyBoard()
    const shipCoordinatesInCurrentTargetArea = game.getShipCoordinatesInCurrentTargetArea()
    const targetShotQueue = game.getTargetShotQueue()
    const shipsInEnermyBoard = game.getShipsInEnermyBoard()

    notifyDto.shots.forEach(shot => {
      const key_coordinate = '' + shot.coordinate[0] + shot.coordinate[1]
      if (shot.status == STATUS_SHOT.HIT) {
        // Neu ban trung thi set toa do = ship
        enemyBoard.set(key_coordinate, COORDINATE_STATUS.SHIP)
        const newCoordinate = new Coordinate(shot.coordinate[0], shot.coordinate[1])
        // Them diem ban trung vao vung dang target
        shipCoordinatesInCurrentTargetArea.push(newCoordinate)
        // Them cac diem xung quanh diem ban trung vao vung chuan bi ban
        targetShotQueue.clear()
        this.findNewTargetAreaInMap(game)
      }
      if (shot.status == STATUS_SHOT.MISS) {
        enemyBoard.set(key_coordinate, COORDINATE_STATUS.SHOT)
        targetShotQueue.clear()
        this.findNewTargetAreaInMap(game)
      }
    });
    notifyDto.sunkShips.forEach(sunkShip => {
      sunkShip.coordinates.forEach(coordinate => {
        const key_coordinate = '' + coordinate[0] + coordinate[1]
        enemyBoard.set(key_coordinate, COORDINATE_STATUS.SUNK)
      })

      const enemyShipIndex = shipsInEnermyBoard.ships.findIndex((ship) => {
        if (ship.status == SHIP_FINDING_STATUS.FINDING && ship.type == sunkShip.type) {
          return true
        } 
        return false
      })
      if(enemyShipIndex >= 0){
        shipsInEnermyBoard.ships[enemyShipIndex].status = SHIP_FINDING_STATUS.KILLED
        shipsInEnermyBoard.ships[enemyShipIndex].coordinates = sunkShip.coordinates
      }
      // Clear vung target hien tai
      shipCoordinatesInCurrentTargetArea.length = 0
      targetShotQueue.clear()
      // Di tim vung target con lai trong ban do
      this.findNewTargetAreaInMap(game)
    })

    if (shipCoordinatesInCurrentTargetArea.length == 0) {
      game.setCurrentMission(MISSION_TYPE.HUNTING)
    } else {
      game.setCurrentMission(MISSION_TYPE.TARGETING)
    }
    console.log("targetShotQueue", targetShotQueue);
    console.log("shipCoordinatesInCurrentTargetArea", shipCoordinatesInCurrentTargetArea);
    console.log("shipsInEnermyBoard", game.getShipsInEnermyBoard());
    console.log("CurrentMission", game.getCurrentMission());
  }
  findNewTargetAreaInMap(game: Game) {
    const enemyBoard = game.getEnemyBoard()
    let firstShipCoordinate: Coordinate = null
    for (let x = 0; x < game.getBoardWidth(); x++) {
      for (let y = 0; y < game.getBoardHeight(); y++) {
        const coordinateStatus = enemyBoard.get('' + x + y)
        if (coordinateStatus == COORDINATE_STATUS.SHIP) {
          firstShipCoordinate = new Coordinate(x, y)
          break;
        }
      }
      if (firstShipCoordinate) break;
    }
    if (!firstShipCoordinate) return
    const area = this.findCoorinatesShipAround(firstShipCoordinate, game, [])
    const shipCoordinatesInCurrentTargetArea = game.getShipCoordinatesInCurrentTargetArea()
    if (area.length > 0) {
      area.forEach(coordinate => {
        shipCoordinatesInCurrentTargetArea.push(coordinate)
      });
      this.buildTargetShotQueueForArea(game)
    }
  }
  buildTargetShotQueueForArea(game: Game) {
    const shipCoordinatesInCurrentTargetArea = game.getShipCoordinatesInCurrentTargetArea()
    const targetShotQueue = game.getTargetShotQueue()
    let checked = new Set()
    const shapeArea = this.getShapeArea(shipCoordinatesInCurrentTargetArea)
    console.log("shapeArea",shapeArea);
    
    shipCoordinatesInCurrentTargetArea.forEach(ship => {
      const availableAround = this.findCoorinatesAvailableAround(ship, game)
      availableAround.forEach(available => {
        const keyCheck = '' + available.x + available.y
        if (!checked.has(keyCheck)) {
          checked.add(keyCheck)
          targetShotQueue.push(available)
        }
      });
    });
  }
  findCoorinatesShipAround(coordinate: Coordinate, game: Game, checked: Coordinate[]): Array<Coordinate> {
    const board = game.getEnemyBoard()
    let up = null;
    let down = null;
    let right = null;
    let left = null;
    let result = [coordinate]
    if (coordinate.y < game.getBoardHeight() - 1) {
      const new_y = coordinate.y + 1;
      if (board.get('' + coordinate.x + new_y) === COORDINATE_STATUS.SHIP) {
        let unchecked = true
        checked.forEach(c => {
          if (c.x == coordinate.x && c.y == new_y) unchecked = false
        });
        if (unchecked) {
          up = new Coordinate(coordinate.x, new_y)
          checked = [...checked, coordinate]
          result = [...result, ...this.findCoorinatesShipAround(up, game, checked)]
        }
      }
    }
    if (coordinate.y > 0) {
      const new_y = coordinate.y - 1;
      if (board.get('' + coordinate.x + new_y) === COORDINATE_STATUS.SHIP) {
        let unchecked = true
        checked.forEach(c => {
          if (c.x == coordinate.x && c.y == new_y) unchecked = false
        });
        if (unchecked) {
          down = new Coordinate(coordinate.x, new_y)
          checked = [...checked, coordinate]
          result = [...result, ...this.findCoorinatesShipAround(down, game, checked)]
        }
      }
    }
    if (coordinate.x > 0) {
      const new_x = coordinate.x - 1;
      if (board.get('' + new_x + coordinate.y) === COORDINATE_STATUS.SHIP) {
        let unchecked = true
        checked.forEach(c => {
          if (c.x == new_x && c.y == coordinate.y) unchecked = false
        });
        if (unchecked) {
          left = new Coordinate(new_x, coordinate.y)
          checked = [...checked, coordinate]
          result = [...result, ...this.findCoorinatesShipAround(left, game, checked)]
        }
      }
    }
    if (coordinate.x < game.getBoardWidth() - 1) {
      const new_x = coordinate.x + 1;
      if (board.get('' + new_x + coordinate.y) === COORDINATE_STATUS.SHIP) {
        let unchecked = true
        checked.forEach(c => {
          if (c.x == new_x && c.y == coordinate.y) unchecked = false
        });
        if (unchecked) {
          right = new Coordinate(new_x, coordinate.y)
          checked = [...checked, coordinate]
          result = [...result, ...this.findCoorinatesShipAround(right, game, checked)]
        }
      }
    }
    return result
  }
  findCoorinatesAvailableAround(coordinate: Coordinate, game: Game): Array<Coordinate> {
    const board = game.getEnemyBoard()
    let up = null;
    let down = null;
    let right = null;
    let left = null;
    const result = []
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
      }game
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
  isCoordinateAvailableForShot(coordinate: Coordinate, game: Game): boolean {
    const board = game.getEnemyBoard()
    const coordinateStatus = board.get('' + coordinate.x + coordinate.y)
    if (coordinateStatus && coordinateStatus == COORDINATE_STATUS.WATER) {
      return true
    }
    return false
  }
  getShapeArea(coordinates: Coordinate[]){
    console.log(coordinates);
    
    const length = coordinates.length
    if(length == 2){
      let first = coordinates[0]
      let second = coordinates[1]
      if(first.y == second.y){
        return TWO_SHAPE_AREA_TYPE.TWO_1
      } 
      if(first.x == second.x){
        return TWO_SHAPE_AREA_TYPE.TWO_2
      } 
    }
    if(length == 3){
      let highest = 0
      let lowest = 7
      let rightest = 0
      let leftest = 19
      let numOfHighest = 0
      let numOfLowest = 0
      let numOfRightest = 0
      let numOfLeftest = 0
      coordinates.forEach(element => {
        if(highest < element.y) highest = element.y
        if(lowest > element.y) lowest = element.y
        if(rightest < element.x) rightest = element.x
        if(leftest > element.x) leftest = element.x
      });
      coordinates.forEach(element => {
        if(highest == element.y) numOfHighest++
        if(lowest == element.y) numOfLowest++
        if(rightest == element.x) numOfRightest++
        if(leftest == element.x) numOfLeftest++
      });
      console.log("highest",highest);
      console.log("lowest",lowest);
      console.log("rightest",rightest);
      console.log("leftest",leftest);

      console.log("numOfHighest",numOfHighest);
      console.log("numOfLowest",numOfLowest);
      console.log("numOfRightest",numOfRightest);
      console.log("numOfLeftest",numOfLeftest);

      if(numOfHighest == 3 && numOfLowest == 3){
        return THREE_SHAPE_AREA_TYPE.THREE_1
      } 
      if(numOfRightest == 3 && numOfLeftest == 3){
        return THREE_SHAPE_AREA_TYPE.THREE_2
      } 
      if(numOfHighest == 2 && numOfLowest == 1 && numOfRightest == 1 && numOfLeftest == 2){
        return THREE_SHAPE_AREA_TYPE.THREE_3
      } 
      if(numOfHighest == 2 && numOfLowest == 1 && numOfRightest == 2 && numOfLeftest == 1){
        return THREE_SHAPE_AREA_TYPE.THREE_4
      } 
      if(numOfHighest == 1 && numOfLowest == 2 && numOfRightest == 1 && numOfLeftest == 2){
        return THREE_SHAPE_AREA_TYPE.THREE_5
      } 
      if(numOfHighest == 1 && numOfLowest == 2 && numOfRightest == 2 && numOfLeftest == 1){
        return THREE_SHAPE_AREA_TYPE.THREE_6
      } 
    }
    if(length == 4){
      let highest = 0
      let lowest = 7
      let rightest = 0
      let leftest = 19
      let numOfHighest = 0
      let numOfLowest = 0
      let numOfRightest = 0
      let numOfLeftest = 0
      coordinates.forEach(element => {
        if(highest < element.y) highest = element.y
        if(lowest > element.y) lowest = element.y
        if(rightest < element.x) rightest = element.x
        if(leftest > element.x) leftest = element.x
      });
      coordinates.forEach(element => {
        if(highest == element.y) numOfHighest++
        if(lowest == element.y) numOfLowest++
        if(rightest == element.x) numOfRightest++
        if(leftest == element.x) numOfLeftest++
      });
      console.log("highest",highest);
      console.log("lowest",lowest);
      console.log("rightest",rightest);
      console.log("leftest",leftest);

      console.log("numOfHighest",numOfHighest);
      console.log("numOfLowest",numOfLowest);
      console.log("numOfRightest",numOfRightest);
      console.log("numOfLeftest",numOfLeftest);

      if(numOfHighest == 1 && numOfLowest == 2 && numOfLeftest == 1 && numOfRightest == 3){
        return FOUR_SHAPE_AREA_TYPE.FOUR_1
      } 
      if(numOfHighest == 1 && numOfLowest == 1 && numOfLeftest == 1 && numOfRightest == 3){
        return FOUR_SHAPE_AREA_TYPE.FOUR_2
      } 
      if(numOfHighest == 3 && numOfLowest == 1 && numOfLeftest == 2 && numOfRightest == 1){
        return FOUR_SHAPE_AREA_TYPE.FOUR_3
      } 
      if(numOfHighest == 3 && numOfLowest == 1 && numOfLeftest == 1 && numOfRightest == 1){
        return FOUR_SHAPE_AREA_TYPE.FOUR_4
      } 
    }
    return MULTIPLE_SHAPE_AREA_TYPE
  }
}