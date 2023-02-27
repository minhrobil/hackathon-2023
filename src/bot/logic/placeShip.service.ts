import { Injectable } from '@nestjs/common';
import { COORDINATE_STATUS, SHIP_TYPE, TACTIC } from '../constant/constant';
import { Coordinate } from '../entities/coordinate.entity';
import { Queue } from './queue.service';
import { MyShipsDto } from '../dto/myShips.dto';
import { COORDINATE_TIGER_TATIC } from '../constant/coordinate.tiger.tatic';
import { Game } from './game.service';
import { COORDINATE_CAT_TACTIC } from '../constant/coordinate.cat.tatic';

@Injectable()
export class PlaceShipService {
  initBoard(myBoard: Map<string, string>, enemyBoard: Map<string, string>, boardWidth: number, boardHeight: number) {
    for (let y = 0; y < boardHeight; y++) {
      for (let x = 0; x < boardWidth; x++) {
        myBoard.set('' + x + y, COORDINATE_STATUS.WATER)
        enemyBoard.set('' + x + y, COORDINATE_STATUS.WATER)
      }
    }
    // two1 
    // enemyBoard.set('164', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('174', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('184', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('194', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('00', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('10', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('07', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('17', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('187', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('197', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('180', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('190', COORDINATE_STATUS.SHIP)
    // two2
    // enemyBoard.set('00', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('01', COORDINATE_STATUS.SHIP)
    // three1
    // enemyBoard.set('00', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('10', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('20', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('11', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('21', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('31', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('41', COORDINATE_STATUS.SHOT)
    // enemyBoard.set('01', COORDINATE_STATUS.SHOT)
    // three2
    // enemyBoard.set('11', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('12', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('13', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('10', COORDINATE_STATUS.SHOT)
    // enemyBoard.set('02', COORDINATE_STATUS.SHOT)

    // three3
    // three4
    // three5
    // three6
    // four1
    // four2
    // four3
    // four4
    // four5
    // four6

    // enemyBoard.set('166', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('168', COORDINATE_STATUS.SHIP)

  }

  getShipLocation(shipType: string, board: Map<string, number>) {
    return {
      type: shipType,
      coordinates: [
        [0, 1]
      ]
    }
  }

  placeShip(game: Game, myShips: MyShipsDto) {
    const myBoard = game.getMyBoard()
    game.setShipsInMyBoard(myShips)
    myShips.ships.forEach(ship => {
      ship.coordinates.forEach(coordinate => {
        myBoard.set('' + coordinate['x'] + coordinate['y'], ship.type)
      })

    })
    this.printBoard(myBoard, game.getBoardWidth(), game.getBoardHeight())
  }

  initHuntShotQueue(game: Game) {
    const huntShotQueue = game.getHuntShotQueue()
    const currentTactic = game.getCurrentTactic()
    if (currentTactic === TACTIC.TIGER) {
      COORDINATE_TIGER_TATIC.forEach(coordinate => {
        huntShotQueue.push(new Coordinate(coordinate.x, coordinate.y))
      })
    }
    if (currentTactic === TACTIC.SNAKE) {
      const coordinates = this.makeCoordinatesSnake(game)
      coordinates.forEach(coordinate => {
        huntShotQueue.push(new Coordinate(coordinate.x, coordinate.y))
      });
    }
    if (currentTactic === TACTIC.WOLF) {
      const coordinates = this.makeCoordinatesWolf(game)
      coordinates.forEach(coordinate => {
        huntShotQueue.push(new Coordinate(coordinate.x, coordinate.y))
      });
    }
    if (currentTactic === TACTIC.CAT) {
      const coordinates = this.makeCoordinatesCat(game)
      coordinates.forEach(coordinate => {
        huntShotQueue.push(new Coordinate(coordinate.x, coordinate.y))
      });
    }
  }

  makeCoordinatesSnake(game: Game) {
    const boardWidth = game.getBoardWidth()
    const boardHeight = game.getBoardHeight()
    const result = []
    for (let y = 0; y < boardHeight; y++) {
      for (let x = 0; x < boardWidth; x++) {
        if (y % 2 == 0 && x % 2 == 0) {
          result.push({x, y})
        }
        if (y % 2 == 1 && x % 2 == 1) {
          result.push({x, y})
        }
      }
    }
    return result
  }
  makeCoordinatesCat(game: Game) {
    const boardWidth = game.getBoardWidth()
    const boardHeight = game.getBoardHeight()
    const result = [...COORDINATE_CAT_TACTIC]
    const checked = new Set()
    result.forEach(element => {
      const keyCheck = ''+element.x+element.y
      checked.add(keyCheck)
    });
    for (let y = 0; y < boardHeight; y++) {
      for (let x = 0; x < boardWidth; x++) {
        const keyCheck = ''+x+y
        if (y % 2 == 0 && x % 2 == 0) {
          if (!checked.has(keyCheck)) {
            checked.add(keyCheck)
            result.push({x, y})
          }
        }
        if (y % 2 == 1 && x % 2 == 1) {
          if (!checked.has(keyCheck)) {
            checked.add(keyCheck)
            result.push({x, y})
          }
        }
      }
    }
    return result
  }
  makeCoordinatesWolf(game: Game) {
    const boardWidth = game.getBoardWidth()
    const boardHeight = game.getBoardHeight()
    const result = []
    for (let y = 0; y < boardHeight; y++) {
      for (let x = 0; x < boardWidth; x++) {
        if (y % 2 == 0 && x % 2 == 0) {
          result.push({x, y})
        }
        if (y % 2 == 1 && x % 2 == 1) {
          result.push({x, y})
        }
      }
    }
    function shuffle(array) {
      let currentIndex = array.length,  randomIndex;
    
      // While there remain elements to shuffle.
      while (currentIndex != 0) {
    
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
    
      return array;
    }
    shuffle(result);
    // Suffle
    return result
  }
  printBoard(board: Map<string, string>, boardWidth: number, boardHeight: number) {
    for (let y = boardHeight - 1; y >= 0; y--) {
      process.stdout.write(y + '  ')
      for (let x = 0; x < boardWidth; x++) {
        const space = '  '
        // if(x>=10) space = '  '
        if (board.get('' + x + y) == COORDINATE_STATUS.WATER) {
          process.stdout.write('_' + space)
          continue
        }
        if (board.get('' + x + y) == COORDINATE_STATUS.SHOT) {
          process.stdout.write('O' + space)
          continue
        }
        if (board.get('' + x + y) == SHIP_TYPE.DD) {
          process.stdout.write('D' + space)
          continue
        }
        if (board.get('' + x + y) == SHIP_TYPE.BB) {
          process.stdout.write('B' + space)
          continue
        }
        if (board.get('' + x + y) == SHIP_TYPE.CA) {
          process.stdout.write('A' + space)
          continue
        }
        if (board.get('' + x + y) == SHIP_TYPE.CV) {
          process.stdout.write('C' + space)
          continue
        }
        if (board.get('' + x + y) == SHIP_TYPE.OR) {
          process.stdout.write('R' + space)
          continue
        }
        if (board.get('' + x + y) == COORDINATE_STATUS.SHIP) {
          process.stdout.write('S' + space)
          continue
        }
        if (board.get('' + x + y) == COORDINATE_STATUS.SUNK) {
          process.stdout.write('X' + space)
          continue
        }
        process.stdout.write(board.get('' + x + y) + space)
        continue
      }
      console.log('');
      console.log('');
    }
    for (let x = -1; x < boardWidth; x++) {
      if (x == -1) {
        process.stdout.write('   ')
      } else {
        if (x >= 10) {
          process.stdout.write(x + ' ')
        } else {
          process.stdout.write(x + '  ')
        }
      }
    }
    console.log('');
  }
}