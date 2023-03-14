import { Injectable } from '@nestjs/common';
import { ShootDto } from '../dto/shoot.dto';
import { Coordinate } from '../entities/coordinate.entity';
import { Game } from './game.service';
import { COORDINATE_STATUS, EMPTY_SHAPE_AREA_TYPE, FOUR_SHAPE_AREA_TYPE, MAX_SHOOT, MIN_SHOOT, MISSION_TYPE, MULTIPLE_SHAPE_AREA_TYPE, MY_PLAYER_ID, SHIP_FINDING_STATUS, SHIP_TYPE, SMART_MODE, STATUS_SHOT, THREE_SHAPE_AREA_TYPE, TWO_SHAPE_AREA_TYPE } from '../constant/constant';
import { NotifyDto } from '../dto/notify.dto';
import { Shape } from '../entities/shape.entity';
import {
  makeCV1Coordinate,
  makeCV2Coordinate,
  makeCV3Coordinate,
  makeCV4Coordinate,
  makeCV5Coordinate,
  makeCV6Coordinate,
  makeCV7Coordinate,
  makeCV8Coordinate,
  makeBB1Coordinate,
  makeBB2Coordinate,
  makeBB3Coordinate,
  makeBB4Coordinate,
  makeBB5Coordinate,
  makeBB6Coordinate,
  makeBB7Coordinate,
  makeBB8Coordinate,
  makeOR1Coordinate,
  makeOR2Coordinate,
  makeOR3Coordinate,
  makeOR4Coordinate,
  makeCA1Coordinate,
  makeCA2Coordinate,
  makeCA3Coordinate,
  makeCA4Coordinate,
  makeCA5Coordinate,
  makeCA6Coordinate,
  makeDD1Coordinate,
  makeDD2Coordinate,
} from '../constant/coordinate.ship.tatic';
import { COORDINATE_CAT_TACTIC } from '../constant/coordinate.cat.tatic';
import { COORDINATE_PRIORITY } from '../constant/coordinate.priority';
@Injectable()
export class ShootService {
  huntShip(shootDto: ShootDto, game: Game) {
    const huntShotQueue = game.getHuntShotQueue()
    const numRemainShip = this.getNumRemainShip(game)
    const result = []
    if (shootDto.maxShots == MAX_SHOOT) {
      // Neu maxShots = 4 phai gui ca 4 diem len
      // Neu queue it hon 4 diem, lay het trong queue ra
      while (huntShotQueue.size() > 0 && result.length < MAX_SHOOT) {
        if (this.isCoordinateAvailableForShot(huntShotQueue.peek(), game)) {
          result.push(huntShotQueue.pop())
        } else {
          huntShotQueue.pop()
        }
      }
      // Con lai bao nhieu diem con thieu thi gui len 0,0
      const missingAfterHunting = MAX_SHOOT - result.length
      for (let i = 1; i <= missingAfterHunting; i++) {
        result.push(new Coordinate(0, 0))
      }
    } else {
      //Kiem tra gia tri queue pop co the ban khong, neu co thi lay ra ban, neu khong thi loai bo
      let combo = shootDto.maxShots + numRemainShip - 1 < parseInt(process.env.COMBO) ? shootDto.maxShots : parseInt(process.env.COMBO)
      let isUseCommbo = process.env.COMBO_WHEN == MISSION_TYPE.HUNTING && shootDto.maxShots == combo
      if (numRemainShip == 1 || this.getMyNumRemainShip(game) <= numRemainShip) {
        combo = shootDto.maxShots
        isUseCommbo = true
      }
      if (isUseCommbo) {
        while (huntShotQueue.size() > 0 && result.length < combo) {
          if (this.isCoordinateAvailableForShot(huntShotQueue.peek(), game)) {
            result.push(huntShotQueue.pop())
          } else {
            huntShotQueue.pop()
          }
        }
        // Con lai bao nhieu diem con thieu thi gui len 0,0
        const missingAfterHunting = combo - result.length
        for (let i = 1; i <= missingAfterHunting; i++) {
          result.push(new Coordinate(0, 0))
        }
      } else {
        while (result.length < MIN_SHOOT && huntShotQueue.size() > 0) {
          if (this.isCoordinateAvailableForShot(huntShotQueue.peek(), game)) {
            result.push(huntShotQueue.pop())
          } else {
            huntShotQueue.pop()
          }
        }
        const missingAfterHunting = MIN_SHOOT - result.length
        // Con lai bao nhieu diem con thieu thi gui len 0,0
        for (let i = 1; i <= missingAfterHunting; i++) {
          result.push(new Coordinate(0, 0))
        }
      }
    }
    return result.map((coordinate: Coordinate) => [coordinate.x, coordinate.y])
  }
  targetShip(shootDto: ShootDto, game: Game) {
    const targetShotQueue = game.getTargetShotQueue()
    const huntShotQueue = game.getHuntShotQueue()
    const numRemainShip = this.getNumRemainShip(game)

    const result = []
    if (shootDto.maxShots == MAX_SHOOT) {
      // Neu maxShots = 4 phai gui ca 4 diem len
      // Neu queue it hon 4 diem, lay het trong queue ra
      while (targetShotQueue.size() > 0 && result.length < MAX_SHOOT) {
        if (this.isCoordinateAvailableForShot(targetShotQueue.peek(), game)) {
          result.push(targetShotQueue.pop())
        } else {
          targetShotQueue.pop()
        }
      }
      // Con lai bao nhieu diem con thieu thi lay tu trong huntingQueue ra
      const missingAfterTarget = MAX_SHOOT - result.length
      for (let i = 1; i <= missingAfterTarget; i++) {
        if (this.isCoordinateAvailableForShot(huntShotQueue.peek(), game)) {
          result.push(huntShotQueue.pop())
        } else {
          huntShotQueue.pop()
        }
      }
      const missingAfterHunting = MAX_SHOOT - result.length
      for (let i = 1; i <= missingAfterHunting; i++) {
        result.push(new Coordinate(0, 0))
      }
    } else {
      //Kiem tra gia tri queue pop co the ban khong, neu co thi lay ra ban, neu khong thi loai bo
      let combo = shootDto.maxShots + numRemainShip - 1 < parseInt(process.env.COMBO) ? shootDto.maxShots : parseInt(process.env.COMBO)
      let isUseCommbo = process.env.COMBO_WHEN == MISSION_TYPE.TARGETING && shootDto.maxShots == combo
      if (numRemainShip == 1 || this.getMyNumRemainShip(game) <= numRemainShip) {
        combo = shootDto.maxShots
        isUseCommbo = true
      }
      if (isUseCommbo) {
        while (targetShotQueue.size() > 0 && result.length < combo) {
          if (this.isCoordinateAvailableForShot(targetShotQueue.peek(), game)) {
            result.push(targetShotQueue.pop())
          } else {
            targetShotQueue.pop()
          }
        }
        const missingAfterTarget = combo - result.length
        for (let i = 1; i <= missingAfterTarget; i++) {
          if (this.isCoordinateAvailableForShot(huntShotQueue.peek(), game)) {
            result.push(huntShotQueue.pop())
          } else {
            huntShotQueue.pop()
          }
        }
        const missingAfterHunting = combo - result.length
        // Con lai bao nhieu diem con thieu thi gui len 0,0
        for (let i = 1; i <= missingAfterHunting; i++) {
          result.push(new Coordinate(0, 0))
        }
      } else {
        while (result.length < MIN_SHOOT && targetShotQueue.size() > 0) {
          if (this.isCoordinateAvailableForShot(targetShotQueue.peek(), game)) {
            result.push(targetShotQueue.pop())
          } else {
            targetShotQueue.pop()
          }
        }
        // Con lai bao nhieu diem con thieu thi gui len 0,0
        const missingAfterTarget = MIN_SHOOT - result.length
        for (let i = 1; i <= missingAfterTarget; i++) {
          if (this.isCoordinateAvailableForShot(huntShotQueue.peek(), game)) {
            result.push(huntShotQueue.pop())
          } else {
            huntShotQueue.pop()
          }
        }
        const missingAfterHunting = MIN_SHOOT - result.length
        // Con lai bao nhieu diem con thieu thi gui len 0,0
        for (let i = 1; i <= missingAfterHunting; i++) {
          result.push(new Coordinate(0, 0))
        }
      }
      return result.map(coordinate => [coordinate.x, coordinate.y])
    }
  }
  updateShotResult(notifyDto: NotifyDto, game: Game) {
    if (notifyDto.playerId != MY_PLAYER_ID) {
      const shipsInMyBoard = game.getShipsInMyBoard()
      notifyDto.sunkShips.forEach(sunkShip => {
        const myShipIndex = shipsInMyBoard.ships.findIndex((ship) => {
          if (ship.status != SHIP_FINDING_STATUS.KILLED && ship.type == sunkShip.type) {
            return true
          }
          return false
        })
        if (myShipIndex >= 0) {
          // Update con tàu mới chìm thành killed
          shipsInMyBoard.ships[myShipIndex].status = SHIP_FINDING_STATUS.KILLED
          shipsInMyBoard.ships[myShipIndex].coordinates = sunkShip.coordinates
        }
      })
      return
    }
    const enemyBoard = game.getEnemyBoard()
    const shipsInEnermyBoard = game.getShipsInEnermyBoard()
    notifyDto.shots.forEach(shot => {
      const key_coordinate = '' + shot.coordinate[0] + shot.coordinate[1]
      if (shot.status == STATUS_SHOT.HIT) {
        // Nếu bắn trung thì set toạ độ = ship
        enemyBoard.set(key_coordinate, COORDINATE_STATUS.SHIP)
      }
      if (shot.status == STATUS_SHOT.MISS) {
        // Nếu bắn trượt thì set toạ độ = shot
        const current = enemyBoard.get(key_coordinate)
        if (current != COORDINATE_STATUS.WATER) {
          enemyBoard.set(key_coordinate, parseInt(current) + 1 + '')
        } else {
          enemyBoard.set(key_coordinate, COORDINATE_STATUS.SHOT)
        }
      }
    });
    notifyDto.sunkShips.forEach(sunkShip => {
      sunkShip.coordinates.forEach(coordinate => {
        const key_coordinate = '' + coordinate[0] + coordinate[1]
        // Nếu tàu chìm thì set toạ độ = sunk
        enemyBoard.set(key_coordinate, COORDINATE_STATUS.SUNK)
      })

      const enemyShipIndex = shipsInEnermyBoard.ships.findIndex((ship) => {
        if (ship.status == SHIP_FINDING_STATUS.FINDING && ship.type == sunkShip.type) {
          return true
        }
        return false
      })
      if (enemyShipIndex >= 0) {
        // Update con tàu mới chìm thành killed
        shipsInEnermyBoard.ships[enemyShipIndex].status = SHIP_FINDING_STATUS.KILLED
        shipsInEnermyBoard.ships[enemyShipIndex].coordinates = sunkShip.coordinates
      }
    })
  }
  getHuntCV = (game: Game) => {
    const CV1Coordinate = makeCV1Coordinate()
    const CV2Coordinate = makeCV2Coordinate()
    const CV3Coordinate = makeCV3Coordinate()
    const CV4Coordinate = makeCV4Coordinate()
    const CV5Coordinate = makeCV5Coordinate()
    const CV6Coordinate = makeCV6Coordinate()
    const CV7Coordinate = makeCV7Coordinate()
    const CV8Coordinate = makeCV8Coordinate()
    const T = [
      CV1Coordinate,
      CV2Coordinate,
      CV3Coordinate,
      CV4Coordinate,
      CV5Coordinate,
      CV6Coordinate,
      CV7Coordinate,
      CV8Coordinate,
    ]
    let minlength = 160
    let maxlength = 0
    let minIndex = 8
    for (let i = 0; i < T.length; i++) {
      let already = 0
      for (let j = 0; j < T[i].length; j++) {
        if (!this.isCoordinateAvailableForShot(T[i][j], game)) {
          already++;
        }
      }
      if (T[i].length - already > maxlength) {
        maxlength = T[i].length - already
      }
      if (T[i].length - already < minlength) {
        minlength = T[i].length - already
        minIndex = i
      }
    }
    console.log("minlengthCV = ", minlength, "maxlengthCV = ", maxlength);
    return T[minIndex]
  }
  getHuntBB = (game: Game) => {
    const BB1Coordinate = makeBB1Coordinate()
    const BB2Coordinate = makeBB2Coordinate()
    const BB3Coordinate = makeBB3Coordinate()
    const BB4Coordinate = makeBB4Coordinate()
    const BB5Coordinate = makeBB5Coordinate()
    const BB6Coordinate = makeBB6Coordinate()
    const BB7Coordinate = makeBB7Coordinate()
    const BB8Coordinate = makeBB8Coordinate()
    const T = [
      BB1Coordinate,
      BB2Coordinate,
      BB3Coordinate,
      BB4Coordinate,
      BB5Coordinate,
      BB6Coordinate,
      BB7Coordinate,
      BB8Coordinate,
    ]
    let minlength = 160
    let maxlength = 0
    let minIndex = 8
    for (let i = 0; i < T.length; i++) {
      let already = 0
      for (let j = 0; j < T[i].length; j++) {
        if (!this.isCoordinateAvailableForShot(T[i][j], game)) {
          already++;
        }
      }
      if (T[i].length - already > maxlength) {
        maxlength = T[i].length - already
      }
      if (T[i].length - already < minlength) {
        minlength = T[i].length - already
        minIndex = i
      }
    }
    console.log("minlengthBB = ", minlength, "maxlengthBB = ", maxlength);
    return T[minIndex]
  }
  getHuntOR = (game: Game) => {
    const OR1Coordinate = makeOR1Coordinate()
    const OR2Coordinate = makeOR2Coordinate()
    const OR3Coordinate = makeOR3Coordinate()
    const OR4Coordinate = makeOR4Coordinate()
    const T = [
      OR1Coordinate,
      OR2Coordinate,
      OR3Coordinate,
      OR4Coordinate,
    ]
    let minlength = 160
    let maxlength = 0
    let minIndex = 8
    for (let i = 0; i < T.length; i++) {
      let already = 0
      for (let j = 0; j < T[i].length; j++) {
        if (!this.isCoordinateAvailableForShot(T[i][j], game)) {
          already++;
        }
      }
      if (T[i].length - already > maxlength) {
        maxlength = T[i].length - already
      }
      if (T[i].length - already < minlength) {
        minlength = T[i].length - already
        minIndex = i
      }
    }
    console.log("minlengthOR = ", minlength, "maxlengthOR = ", maxlength);
    return T[minIndex]
  }
  getHuntCA = (game: Game) => {
    const CA1Coordinate = makeCA1Coordinate()
    const CA2Coordinate = makeCA2Coordinate()
    const CA3Coordinate = makeCA3Coordinate()
    const CA4Coordinate = makeCA4Coordinate()
    const CA5Coordinate = makeCA5Coordinate()
    const CA6Coordinate = makeCA6Coordinate()
    const T = [
      CA1Coordinate,
      CA2Coordinate,
      CA3Coordinate,
      CA4Coordinate,
      CA5Coordinate,
      CA6Coordinate
    ]
    let minlength = 160
    let maxlength = 0
    let minIndex = 8
    for (let i = 0; i < T.length; i++) {
      let already = 0
      for (let j = 0; j < T[i].length; j++) {
        if (!this.isCoordinateAvailableForShot(T[i][j], game)) {
          already++;
        }
      }
      if (T[i].length - already > maxlength) {
        maxlength = T[i].length - already
      }
      if (T[i].length - already < minlength) {
        minlength = T[i].length - already
        minIndex = i
      }
    }
    console.log("minlengthCA = ", minlength, "maxlengthCA = ", maxlength);
    return T[minIndex]
  }
  getHuntDD = (game: Game) => {
    const DD1Coordinate = makeDD1Coordinate()
    const DD2Coordinate = makeDD2Coordinate()
    const T = [
      DD1Coordinate,
      DD2Coordinate,
    ]
    let minlength = 160
    let maxlength = 0
    let minIndex = 8
    for (let i = 0; i < T.length; i++) {
      let already = 0
      for (let j = 0; j < T[i].length; j++) {
        if (!this.isCoordinateAvailableForShot(T[i][j], game)) {
          already++;
        }
      }
      if (T[i].length - already > maxlength) {
        maxlength = T[i].length - already
      }
      if (T[i].length - already < minlength) {
        minlength = T[i].length - already
        minIndex = i
      }
    }
    console.log("minlengthDD = ", minlength, "maxlengthDD = ", maxlength);
    return T[minIndex]
  }
  buildHuntShotQueue(game: Game) {
    const huntShotQueue = game.getHuntShotQueue()
    const checked = new Set()
    const mapAppear: Map<string, number> = new Map()

    huntShotQueue.clear()
    let CV: Coordinate[] = []
    let BB: Coordinate[] = []
    let OR: Coordinate[] = []
    let CA: Coordinate[] = []
    let DD: Coordinate[] = []
    const isRemainCV = this.isRemainCV(game)
    const isRemainBB = this.isRemainBB(game)
    const isRemainCA = this.isRemainCA(game)
    const isRemainOR = this.isRemainOR(game)
    const isRemainDD = this.isRemainDD(game)
    if (isRemainCV) {
      CV = [...this.getHuntCV(game)]
      CV.forEach(element => {
        const key = '' + element.x + element.y
        if (mapAppear.has(key)) {
          mapAppear.set(key, mapAppear.get(key) + 1)
        } else {
          mapAppear.set(key, 1)
        }
      });
    }
    if (isRemainBB) {
      BB = [...this.getHuntBB(game)]
      BB.forEach(element => {
        const key = '' + element.x + element.y
        if (mapAppear.has(key)) {
          mapAppear.set(key, mapAppear.get(key) + 1)
        } else {
          mapAppear.set(key, 1)
        }
      });
    }
    if (isRemainOR) {
      OR = [...this.getHuntOR(game)]
      OR.forEach(element => {
        const key = '' + element.x + element.y
        if (mapAppear.has(key)) {
          mapAppear.set(key, mapAppear.get(key) + 1)
        } else {
          mapAppear.set(key, 1)
        }
      });
    }
    if (isRemainCA) {
      CA = [...this.getHuntCA(game)]
      CA.forEach(element => {
        const key = '' + element.x + element.y
        if (mapAppear.has(key)) {
          mapAppear.set(key, mapAppear.get(key) + 1)
        } else {
          mapAppear.set(key, 1)
        }
      });
    }
    if (isRemainDD) {
      DD = [...this.getHuntDD(game)]
      DD.forEach(element => {
        const key = '' + element.x + element.y
        if (mapAppear.has(key)) {
          mapAppear.set(key, mapAppear.get(key) + 1)
        } else {
          mapAppear.set(key, 1)
        }
      });
    }

    let full = [...CV, ...BB, ...OR, ...CA, ...DD]
    let appear1 = []
    let appear2 = []
    let appear3 = []
    let appear4 = []
    let appear5 = []
    let priority = []
    const checkPriority = new Set()
    COORDINATE_PRIORITY.forEach(priority=>{
      checkPriority.add(''+priority.x+priority.y)
    })
    full.forEach(coordinate => {
      const keyCheck = '' + coordinate.x + coordinate.y
      if (!checked.has(keyCheck)) {
        checked.add(keyCheck)
        if (this.isCoordinateAvailableForShot(coordinate, game)) {
          if (mapAppear.get(keyCheck) == 5) {
            if(checkPriority.has(keyCheck)){
              priority.push(coordinate)
            }else{
              appear5.push(coordinate)
            }
          }
          if (mapAppear.get(keyCheck) == 4) {
            if(checkPriority.has(keyCheck)){
              priority.push(coordinate)
            }else{
              appear4.push(coordinate)
            }
          }
          if (mapAppear.get(keyCheck) == 3) {
            if(checkPriority.has(keyCheck)){
              priority.push(coordinate)
            }else{
              appear3.push(coordinate)
            }
          }
          if (mapAppear.get(keyCheck) == 2) {
            if(checkPriority.has(keyCheck)){
              priority.push(coordinate)
            }else{
              appear2.push(coordinate)
            }
          }
          if (mapAppear.get(keyCheck) == 1) {
            if(checkPriority.has(keyCheck)){
              priority.push(coordinate)
            }else{
              appear1.push(coordinate)
            }
          }
        }
      }
    });
    let fullAppear: Coordinate[] = [...priority,...appear5, ...appear4, ...appear3, ...appear2, ...appear1]
    game.setCountAppear(mapAppear)
    fullAppear.forEach(coordinate => {
      huntShotQueue.push(coordinate)
    })
    console.log("priority ", priority.length);
    console.log("appear5 ", appear5.length);
    console.log("appear4 ", appear4.length);
    console.log("appear3 ", appear3.length);
    console.log("appear2 ", appear2.length);
    console.log("appear1 ", appear1.length);
    console.log("huntShotQueue", huntShotQueue.size());
  }
  updateCurrentMission(game: Game) {
    const targetShotQueue = game.getTargetShotQueue()
    targetShotQueue.clear()
    this.buildHuntShotQueue(game)
    this.findNewTargetAreaInMap(game)
    if (game.getShipCoordinatesInCurrentTargetArea().length == 0) {
      game.setCurrentMission(MISSION_TYPE.HUNTING)
    } else {
      game.setCurrentMission(MISSION_TYPE.TARGETING)
    }
    // console.log("targetShotQueue", game.getTargetShotQueue());
    // console.log("shipCoordinatesInCurrentTargetArea", game.getShipCoordinatesInCurrentTargetArea());
    // console.log("shipsInEnermyBoard", game.getShipsInEnermyBoard());
    // console.log("CurrentMission", game.getCurrentMission());
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
    const shipCoordinatesInCurrentTargetArea = game.getShipCoordinatesInCurrentTargetArea()
    shipCoordinatesInCurrentTargetArea.length = 0
    if (!firstShipCoordinate) return
    const area = this.findCoorinatesShipAround(firstShipCoordinate, game, [])
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
    targetShotQueue.clear()
    const checked = new Set()
    const recommendCoordinate = this.getRecommendCoordinate(game)
    if (recommendCoordinate && parseInt(process.env.SMART_MODE) == SMART_MODE) {
      checked.add('' + recommendCoordinate.x + recommendCoordinate.y)
      targetShotQueue.push(recommendCoordinate)
    }
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
    const countAppear = game.getCountAppear()
    const board = game.getEnemyBoard()
    let up = {
      coordinate: null,
      count: 0
    };
    let down = {
      coordinate: null,
      count: 0
    };;
    let right = {
      coordinate: null,
      count: 0
    };;
    let left = {
      coordinate: null,
      count: 0
    };;
    if (coordinate.x < game.getBoardWidth() - 1) {
      const new_x = coordinate.x + 1;
      const key = '' + new_x + coordinate.y
      if (board.get(key) === COORDINATE_STATUS.WATER) {
        right.coordinate = new Coordinate(new_x, coordinate.y)
        right.count = countAppear.has(key) ? countAppear.get(key) : 0
      }
    }
    if (coordinate.y < game.getBoardHeight() - 1) {
      const new_y = coordinate.y + 1;
      const key = '' + coordinate.x + new_y
      if (board.get(key) === COORDINATE_STATUS.WATER) {
        up.coordinate = new Coordinate(coordinate.x, new_y)
        up.count = countAppear.has(key) ? countAppear.get(key) : 0
      }
    }
    if (coordinate.y > 0) {
      const new_y = coordinate.y - 1;
      const key = '' + coordinate.x + new_y
      if (board.get(key) === COORDINATE_STATUS.WATER) {
        down.coordinate = new Coordinate(coordinate.x, new_y)
        down.count = countAppear.has(key) ? countAppear.get(key) : 0
      }
    }
    if (coordinate.x > 0) {
      const new_x = coordinate.x - 1;
      const key = '' + new_x + coordinate.y
      if (board.get(key) === COORDINATE_STATUS.WATER) {
        left.coordinate = new Coordinate(new_x, coordinate.y)
        left.count = countAppear.has(key) ? countAppear.get(key) : 0
      }
    }
    const count: {
      coordinate: any;
      count: number;
    }[] = []
    if (right.coordinate) {
      count.push(right)
    }
    if (up.coordinate) {
      count.push(up)
    }
    if (down.coordinate) {
      count.push(down)
    }
    if (left.coordinate) {
      count.push(left)
    }
    count.sort((a, b) => {
      if (a.count > b.count) {
        return 1;
      }
      if (a.count < b.count) {
        return -1;
      }
      return 0;
    });
    return count.map(e => e.coordinate)
  }
  isCoordinateAvailableForShot(coordinate: Coordinate, game: Game): boolean {
    const board = game.getEnemyBoard()
    if (!coordinate) return false
    const coordinateStatus = board.get('' + coordinate.x + coordinate.y)
    if (coordinateStatus && coordinateStatus == COORDINATE_STATUS.WATER) {
      return true
    }
    return false
  }
  getShapeAreaAndRecommend(game: Game) {
    const coordinates = game.getShipCoordinatesInCurrentTargetArea()
    const length = coordinates.length
    const result = {
      shapeArea: '',
      recommends: []
    }
    const pushToResult = (coordinate: Coordinate) => {
      if (this.isCoordinateAvailableForShot(coordinate, game)) {
        result.recommends.push(coordinate)
      }
    }
    if (length == 2) {
      let highest = 0
      let lowest = 7
      let rightest = 0
      let leftest = 19
      let numOfHighest = 0
      let numOfLowest = 0
      let numOfRightest = 0
      let numOfLeftest = 0
      coordinates.forEach(element => {
        if (highest < element.y) highest = element.y
        if (lowest > element.y) lowest = element.y
        if (rightest < element.x) rightest = element.x
        if (leftest > element.x) leftest = element.x
      });
      coordinates.forEach(element => {
        if (highest == element.y) numOfHighest++
        if (lowest == element.y) numOfLowest++
        if (rightest == element.x) numOfRightest++
        if (leftest == element.x) numOfLeftest++
      });
      const shape = new Shape(highest, numOfHighest, lowest, numOfLowest, rightest, numOfRightest, leftest, numOfLeftest)
      let toCV = { isOK: false, recommend: null }
      let toBB = { isOK: false, recommend: null }
      let toOR = { isOK: false, recommend: null }
      let toCA = { isOK: false, recommend: null }
      if (numOfHighest == 2 && numOfLowest == 2) {
        result.shapeArea = TWO_SHAPE_AREA_TYPE.TWO_1
        toCV = this.isTwo1ToCV(shape, game)
        toBB = this.isTwo1ToBB(shape, game)
        toOR = this.isTwo1ToOR(shape, game)
        toCA = this.isTwo1ToCA(shape, game)
      }
      if (numOfRightest == 2 && numOfLeftest == 2) {
        result.shapeArea = TWO_SHAPE_AREA_TYPE.TWO_2
        toCV = this.isTwo2ToCV(shape, game)
        toBB = this.isTwo2ToBB(shape, game)
        toOR = this.isTwo2ToOR(shape, game)
        toCA = this.isTwo2ToCA(shape, game)
      }
      let recommend = null
      if (toCV.isOK) {
        recommend = toCV.recommend
      }
      if (toBB.isOK) {
        recommend = toBB.recommend
      }
      if (toOR.isOK) {
        recommend = toOR.recommend
      }
      if (toCA.isOK) {
        recommend = toCA.recommend
      }
      if (recommend) {
        pushToResult(recommend)
      }
    }
    if (length == 3) {
      let highest = 0
      let lowest = 7
      let rightest = 0
      let leftest = 19
      let numOfHighest = 0
      let numOfLowest = 0
      let numOfRightest = 0
      let numOfLeftest = 0
      coordinates.forEach(element => {
        if (highest < element.y) highest = element.y
        if (lowest > element.y) lowest = element.y
        if (rightest < element.x) rightest = element.x
        if (leftest > element.x) leftest = element.x
      });
      coordinates.forEach(element => {
        if (highest == element.y) numOfHighest++
        if (lowest == element.y) numOfLowest++
        if (rightest == element.x) numOfRightest++
        if (leftest == element.x) numOfLeftest++
      });
      const shape = new Shape(highest, numOfHighest, lowest, numOfLowest, rightest, numOfRightest, leftest, numOfLeftest)
      let toCV = { isOK: false, recommend: null }
      let toBB = { isOK: false, recommend: null }
      let toOR = { isOK: false, recommend: null }
      let recommend = null
      if (numOfHighest == 3 && numOfLowest == 3) {
        result.shapeArea = THREE_SHAPE_AREA_TYPE.THREE_1
        toCV = this.isThree1ToCV(shape, game)
        toBB = this.isThree1ToBB(shape, game)
      }
      if (numOfRightest == 3 && numOfLeftest == 3) {
        result.shapeArea = THREE_SHAPE_AREA_TYPE.THREE_2
        toCV = this.isThree2ToCV(shape, game)
        toBB = this.isThree2ToBB(shape, game)
      }
      if (numOfHighest == 2 && numOfLowest == 1 && numOfRightest == 1 && numOfLeftest == 2) {
        result.shapeArea = THREE_SHAPE_AREA_TYPE.THREE_3
        toCV = this.isThree3ToCV(shape, game)
        toOR = this.isThree3ToOR(shape, game)
      }
      if (numOfHighest == 2 && numOfLowest == 1 && numOfRightest == 2 && numOfLeftest == 1) {
        result.shapeArea = THREE_SHAPE_AREA_TYPE.THREE_4
        toCV = this.isThree4ToCV(shape, game)
        toOR = this.isThree4ToOR(shape, game)
      }
      if (numOfHighest == 1 && numOfLowest == 2 && numOfRightest == 1 && numOfLeftest == 2) {
        result.shapeArea = THREE_SHAPE_AREA_TYPE.THREE_5
        toOR = this.isThree5ToOR(shape, game)
      }
      if (numOfHighest == 1 && numOfLowest == 2 && numOfRightest == 2 && numOfLeftest == 1) {
        result.shapeArea = THREE_SHAPE_AREA_TYPE.THREE_6
        toCV = this.isThree6ToCV(shape, game)
        toOR = this.isThree6ToOR(shape, game)
      }
      if (toCV.isOK) {
        recommend = toCV.recommend
      }
      if (toBB.isOK) {
        recommend = toBB.recommend
      }
      if (toOR.isOK) {
        recommend = toOR.recommend
      }
      if (recommend) {
        pushToResult(recommend)
      }
    }
    if (length == 4) {
      let highest = 0
      let lowest = 7
      let rightest = 0
      let leftest = 19
      let numOfHighest = 0
      let numOfLowest = 0
      let numOfRightest = 0
      let numOfLeftest = 0
      coordinates.forEach(element => {
        if (highest < element.y) highest = element.y
        if (lowest > element.y) lowest = element.y
        if (rightest < element.x) rightest = element.x
        if (leftest > element.x) leftest = element.x
      });
      coordinates.forEach(element => {
        if (highest == element.y) numOfHighest++
        if (lowest == element.y) numOfLowest++
        if (rightest == element.x) numOfRightest++
        if (leftest == element.x) numOfLeftest++
      });
      const shape = new Shape(highest, numOfHighest, lowest, numOfLowest, rightest, numOfRightest, leftest, numOfLeftest)
      let toCV = { isOK: false, recommend: null }
      let recommend = null
      if (numOfHighest == 4 && numOfLowest == 4) {
        result.shapeArea = FOUR_SHAPE_AREA_TYPE.FOUR_1
        toCV = this.isFour1ToCV(shape, game)
      }
      if (numOfLeftest == 4 && numOfRightest == 4) {
        result.shapeArea = FOUR_SHAPE_AREA_TYPE.FOUR_2
        toCV = this.isFour2ToCV(shape, game)
      }
      if (numOfHighest == 1 && numOfLowest == 2 && numOfLeftest == 1 && numOfRightest == 3) {
        result.shapeArea = FOUR_SHAPE_AREA_TYPE.FOUR_3
        toCV = this.isFour3ToCV(shape, game)
      }
      if (numOfHighest == 1 && numOfLowest == 1 && numOfLeftest == 1 && numOfRightest == 3) {
        result.shapeArea = FOUR_SHAPE_AREA_TYPE.FOUR_4
        toCV = this.isFour4ToCV(shape, game)
      }
      if (numOfHighest == 3 && numOfLowest == 1 && numOfLeftest == 2 && numOfRightest == 1) {
        result.shapeArea = FOUR_SHAPE_AREA_TYPE.FOUR_5
        toCV = this.isFour5ToCV(shape, game)
      }
      if (numOfHighest == 3 && numOfLowest == 1 && numOfLeftest == 1 && numOfRightest == 1) {
        result.shapeArea = FOUR_SHAPE_AREA_TYPE.FOUR_6
        toCV = this.isFour6ToCV(shape, game)
      }
      if (toCV.isOK) {
        recommend = toCV.recommend
      }
      if (recommend) {
        pushToResult(recommend)
      }
    }
    if (result.recommends.length == 0) {
      result.shapeArea = MULTIPLE_SHAPE_AREA_TYPE
    }
    if (length == 0) {
      result.shapeArea = EMPTY_SHAPE_AREA_TYPE
    }
    return result
  }
  getRecommendCoordinate(game: Game): Coordinate | null {
    const { shapeArea, recommends } = this.getShapeAreaAndRecommend(game)
    if (recommends.length > 0) {
      return recommends[0]
    }
    return null
  }
  isRemainDD(game: Game): boolean {
    const shipsInEnermyBoard = game.getShipsInEnermyBoard()
    const index = shipsInEnermyBoard.ships.findIndex((ship) => {
      if (ship.status == SHIP_FINDING_STATUS.FINDING && ship.type == SHIP_TYPE.DD) {
        return true
      }
    })
    return index >= 0
  }
  isRemainCA(game: Game): boolean {
    const shipsInEnermyBoard = game.getShipsInEnermyBoard()
    const index = shipsInEnermyBoard.ships.findIndex((ship) => {
      if (ship.status == SHIP_FINDING_STATUS.FINDING && ship.type == SHIP_TYPE.CA) {
        return true
      }
    })
    return index >= 0
  }
  isRemainOR(game: Game): boolean {
    const shipsInEnermyBoard = game.getShipsInEnermyBoard()
    const index = shipsInEnermyBoard.ships.findIndex((ship) => {
      if (ship.status == SHIP_FINDING_STATUS.FINDING && ship.type == SHIP_TYPE.OR) {
        return true
      }
    })
    return index >= 0
  }
  isRemainBB(game: Game): boolean {
    const shipsInEnermyBoard = game.getShipsInEnermyBoard()
    const index = shipsInEnermyBoard.ships.findIndex((ship) => {
      if (ship.status == SHIP_FINDING_STATUS.FINDING && ship.type == SHIP_TYPE.BB) {
        return true
      }
    })
    return index >= 0
  }
  isRemainCV(game: Game): boolean {
    const shipsInEnermyBoard = game.getShipsInEnermyBoard()
    const index = shipsInEnermyBoard.ships.findIndex((ship) => {
      if (ship.status == SHIP_FINDING_STATUS.FINDING && ship.type == SHIP_TYPE.CV) {
        return true
      }
    })
    return index >= 0
  }
  getNumRemainShip(game: Game): number {
    const shipsInEnermyBoard = game.getShipsInEnermyBoard()
    let result = 0
    shipsInEnermyBoard.ships.forEach((ship) => {
      if (ship.status == SHIP_FINDING_STATUS.FINDING) {
        return result++
      }
    })
    return result
  }
  getMyNumRemainShip(game: Game): number {
    const shipsInMyBoard = game.getShipsInMyBoard()
    let result = 0
    shipsInMyBoard.ships.forEach((ship) => {
      if (ship.status != SHIP_FINDING_STATUS.KILLED) {
        return result++
      }
    })
    return result
  }
  isNeedThree12(game: Game): boolean {
    const isRemainCA = this.isRemainCA(game)
    const isRemainBB = this.isRemainBB(game)
    const isRemainCV = this.isRemainCV(game)
    return isRemainCA || isRemainBB || isRemainCV
  }
  isNeedThree3456(game: Game): boolean {
    const isRemainOR = this.isRemainOR(game)
    const isRemainCV = this.isRemainCV(game)
    return isRemainOR || isRemainCV
  }
  isNeedFour12(game: Game): boolean {
    const isRemainBB = this.isRemainBB(game)
    const isRemainCV = this.isRemainCV(game)
    return isRemainBB || isRemainCV
  }
  isNeedFour3456(game: Game): boolean {
    const isRemainCV = this.isRemainCV(game)
    return isRemainCV
  }
  isNeedFour7(game: Game): boolean {
    const isRemainOR = this.isRemainOR(game)
    return isRemainOR
  }
  checkAllCoordinatesToShip(cases: Coordinate[][], game: Game): { isOK: boolean, recommend: Coordinate } {
    for (let i = 0; i < cases.length; i++) {
      const isCaseOK = cases[i].every(coordinate => {
        const key = '' + coordinate.x + coordinate.y
        const status = game.getEnemyBoard().get(key)
        if (status == COORDINATE_STATUS.WATER || status == COORDINATE_STATUS.SHIP) {
          return true
        }
      })
      if (isCaseOK) {
        return {
          isOK: true,
          recommend: cases[i][0]
        }
      }
    }
    return {
      isOK: false,
      recommend: null
    }
  }
  isTwo1ToCA(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainCA(game)
    const case1 = [new Coordinate(shape.rightest + 1, shape.highest)]
    const case2 = [new Coordinate(shape.leftest - 1, shape.highest)]
    const cases = [case1, case2]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
  isTwo1ToOR(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainOR(game)
    const case1 = [new Coordinate(shape.rightest, shape.highest + 1), new Coordinate(shape.leftest, shape.highest + 1)]
    const case2 = [new Coordinate(shape.rightest, shape.highest - 1), new Coordinate(shape.leftest, shape.highest - 1)]
    const cases = [case1, case2]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
  isTwo1ToBB(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainBB(game)
    const case1 = [new Coordinate(shape.rightest + 1, shape.highest), new Coordinate(shape.rightest + 2, shape.highest)]
    const case2 = [new Coordinate(shape.leftest - 1, shape.highest), new Coordinate(shape.leftest - 2, shape.highest)]
    const cases = [case1, case2]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
  isTwo1ToCV(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainCV(game)
    const case1 = [new Coordinate(shape.rightest + 1, shape.highest), new Coordinate(shape.rightest + 2, shape.highest), new Coordinate(shape.rightest, shape.highest - 1)]
    const case2 = [new Coordinate(shape.rightest + 1, shape.highest), new Coordinate(shape.leftest - 1, shape.highest), new Coordinate(shape.leftest, shape.highest - 1)]
    const case3 = [new Coordinate(shape.leftest - 1, shape.highest), new Coordinate(shape.leftest - 2, shape.highest), new Coordinate(shape.leftest - 1, shape.highest - 1)]
    const case4 = [new Coordinate(shape.rightest, shape.highest + 1), new Coordinate(shape.rightest, shape.highest + 2), new Coordinate(shape.rightest, shape.highest - 1)]
    const cases = [case1, case2, case3, case4]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
  isTwo2ToCA(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainCA(game)
    const case1 = [new Coordinate(shape.rightest, shape.highest + 1)]
    const case2 = [new Coordinate(shape.rightest, shape.lowest - 1)]
    const cases = [case1, case2]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
  isTwo2ToOR(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainOR(game)
    const case1 = [new Coordinate(shape.rightest + 1, shape.highest), new Coordinate(shape.rightest + 1, shape.lowest)]
    const case2 = [new Coordinate(shape.leftest - 1, shape.highest), new Coordinate(shape.leftest - 1, shape.lowest)]
    const cases = [case1, case2]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
  isTwo2ToBB(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainBB(game)
    const case1 = [new Coordinate(shape.rightest, shape.highest + 1), new Coordinate(shape.rightest, shape.highest + 2)]
    const case2 = [new Coordinate(shape.rightest, shape.lowest - 1), new Coordinate(shape.rightest, shape.lowest - 2)]
    const cases = [case1, case2]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
  isTwo2ToCV(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainCV(game)
    const case1 = [new Coordinate(shape.rightest, shape.lowest - 1), new Coordinate(shape.rightest, shape.lowest - 2), new Coordinate(shape.rightest - 1, shape.lowest - 1)]
    const case2 = [new Coordinate(shape.rightest, shape.highest + 1), new Coordinate(shape.rightest, shape.lowest - 1), new Coordinate(shape.rightest - 1, shape.lowest)]
    const case3 = [new Coordinate(shape.rightest, shape.highest + 1), new Coordinate(shape.rightest, shape.highest + 2), new Coordinate(shape.rightest - 1, shape.highest)]
    const case4 = [new Coordinate(shape.leftest - 1, shape.highest), new Coordinate(shape.leftest + 1, shape.highest), new Coordinate(shape.leftest + 2, shape.highest)]
    const cases = [case1, case2, case3, case4]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
  isThree1ToBB(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainBB(game)
    const case1 = [new Coordinate(shape.rightest + 1, shape.highest)]
    const case2 = [new Coordinate(shape.leftest - 1, shape.highest)]
    const cases = [case1, case2]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
  isThree1ToCV(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainCV(game)
    const case1 = [new Coordinate(shape.rightest + 1, shape.highest), new Coordinate(shape.leftest + 1, shape.highest - 1)]
    const case2 = [new Coordinate(shape.leftest - 1, shape.highest), new Coordinate(shape.leftest, shape.highest - 1)]
    const cases = [case1, case2]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
  isThree2ToBB(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainBB(game)
    const case1 = [new Coordinate(shape.rightest, shape.highest + 1)]
    const case2 = [new Coordinate(shape.rightest, shape.lowest - 1)]
    const cases = [case1, case2]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
  isThree2ToCV(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainCV(game)
    const case1 = [new Coordinate(shape.rightest, shape.lowest - 1), new Coordinate(shape.rightest - 1, shape.lowest)]
    const case2 = [new Coordinate(shape.rightest, shape.highest + 1), new Coordinate(shape.rightest - 1, shape.highest - 1)]
    const cases = [case1, case2]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
  isThree3ToOR(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainOR(game)
    const case1 = [new Coordinate(shape.rightest, shape.lowest)]
    const cases = [case1]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
  isThree3ToCV(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainCV(game)
    const case1 = [new Coordinate(shape.leftest - 1, shape.highest), new Coordinate(shape.rightest + 1, shape.highest)]
    const cases = [case1]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
  isThree4ToOR(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainOR(game)
    const case1 = [new Coordinate(shape.leftest, shape.lowest)]
    const cases = [case1]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
  isThree4ToCV(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainCV(game)
    const case1 = [new Coordinate(shape.rightest + 1, shape.highest), new Coordinate(shape.rightest + 2, shape.highest)]
    const case2 = [new Coordinate(shape.rightest, shape.highest + 1), new Coordinate(shape.rightest, shape.highest + 2)]
    const cases = [case1, case2]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
  isThree5ToOR(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainOR(game)
    const case1 = [new Coordinate(shape.rightest, shape.highest)]
    const cases = [case1]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
  isThree6ToOR(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainOR(game)
    const case1 = [new Coordinate(shape.leftest, shape.highest)]
    const cases = [case1]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
  isThree6ToCV(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainCV(game)
    const case1 = [new Coordinate(shape.rightest, shape.highest + 1), new Coordinate(shape.rightest, shape.lowest - 1)]
    const cases = [case1]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
  isFour1ToCV(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainCV(game)
    const case1 = [new Coordinate(shape.leftest + 1, shape.highest - 1)]
    const cases = [case1]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
  isFour2ToCV(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainCV(game)
    const case1 = [new Coordinate(shape.leftest - 1, shape.lowest + 1)]
    const cases = [case1]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
  isFour3ToCV(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainCV(game)
    const case1 = [new Coordinate(shape.rightest, shape.lowest - 1)]
    const cases = [case1]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
  isFour4ToCV(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainCV(game)
    const case1 = [new Coordinate(shape.rightest, shape.highest + 1)]
    const cases = [case1]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
  isFour5ToCV(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainCV(game)
    const case1 = [new Coordinate(shape.leftest - 1, shape.highest)]
    const cases = [case1]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
  isFour6ToCV(shape: Shape, game): { isOK: boolean, recommend: Coordinate } {
    const isRemain = this.isRemainCV(game)
    const case1 = [new Coordinate(shape.rightest + 1, shape.highest)]
    const cases = [case1]
    const checkResult = this.checkAllCoordinatesToShip(cases, game)
    return {
      isOK: checkResult.isOK && isRemain,
      recommend: checkResult.recommend
    }
  }
}